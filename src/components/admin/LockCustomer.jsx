import React, { Component } from "react";
import { Navbar } from "../common";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import { fetchLockedCustomers, lockCustomer } from "../actions/creditActions";
import { Pagination, Preloader } from "../common";
import moment from "moment";
import LockCustomerModal from "./LockCustomerModal";
class LockCustomer extends Component {
  state = {
    phone: "",
    page: 0,
    limit: 10,
    count: 0,
    creditCount: 0,
    preloaderStyle: "d-none",
    lockedCustomers: [],
    lockCustomerMsg: {},
    errors: {},
  };

  handlePreloaderStyle = (newStyle) => {
    this.setState({ preloaderStyle: newStyle });
  };

  handleIncrementPage = (e) => {
    e.preventDefault();
    const { page, limit, count } = this.state;
    const totalPages = Math.ceil(count / limit);
    const newPage = page + 1;

    if (newPage < totalPages) {
      this.setState({ page: newPage, creditCount: newPage * limit });
      this.fetchLockedCustomers(newPage, limit);
    }
  };

  handleDecrementPage = (e) => {
    e.preventDefault();
    const { page, limit } = this.state;
    const newPage = page - 1;
    if (newPage >= 0) {
      this.setState({ page: newPage, creditCount: newPage * limit });
      this.fetchLockedCustomers(newPage, limit);
    }
  };

  handleOnChangePage = (e) => {
    const { limit } = this.state;
    const newPage = parseInt(e.target.value);
    this.setState({
      [e.target.name]: newPage,
      creditCount: newPage * limit,
    });
    this.fetchLockedCustomers(newPage, limit);
  };

  onChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  fetchLockedCustomers = (page, limit) => {
    this.props.fetchLockedCustomers(page, limit);
  };

  lockCustomer = () => {
    const { phone, page, limit } = this.state;

    if (phone === "") {
      Swal.fire("Phone number is required", "", "error");
    } else {
      this.handlePreloaderStyle("d-block");
      let data = { phone };
      this.props.lockCustomer(data);
      this.fetchLockedCustomers(page, limit);
      this.setState({
        phone: "",
      });
    }
  };

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/agentLogin");
    }
    const { page, limit } = this.state;
    this.fetchLockedCustomers(page, limit);
    console.log(this.props.auth.agent.id);
    this.interval = setInterval(
      () => this.fetchLockedCustomers(page, limit),
      10000
    );
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.errors !== state.errors) {
      return {
        errors: props.errors,
        preloaderStyle: "d-none",
      };
    }

    if (props.lockedCustomers !== state.lockedCustomers) {
      console.log(props.lockedCustomers.items);
      return {
        lockedCustomers: props.lockedCustomers.items,
        count: props.lockedCustomers.rows,
        preloaderStyle: "d-none",
      };
    }

    if (props.lockCustomerMsg !== state.lockCustomerMsg) {
      if (props.lockCustomerMsg.message === "Customer Locked") {
        // props.fetchLockedCustomers();
        return {
          lockCustomerMsg: props.lockCustomerMsg.message,
          preloaderStyle: "d-none",
        };
      }
    }
  }

  render() {
    const { auth } = this.props;
    const {
      phone,
      amount,
      lockedCustomers,
      creditCount,
      page,
      limit,
      count,
      preloaderStyle,
    } = this.state;

    let creditCountAll = creditCount + 1;

    const lockedCustomerHistory =
      lockedCustomers instanceof Array
        ? lockedCustomers.map((credit) => (
            <tr key={credit.id}>
              <th scope="row">{creditCountAll++}</th>
              <td>{moment(credit.created_at).format("LLLL")}</td>
              <td>{moment(credit.updated_at).format("LLLL")}</td>
              <td>{"Kes " + credit.amount}</td>
              <td>{credit.first_name}</td>
              <td>{credit.last_name}</td>
              <td>{credit.phone_number}</td>
            </tr>
          ))
        : null;

    return (
      <React.Fragment>
        <Navbar firstName={auth.agent.first_name} />
        <Preloader preloaderStyle={preloaderStyle} />
        <div className="container-fluid">
          <div className="card mt-5">
            <div className="card-body">
              <div className="d-flex flex-wrap justify-content-between my-1">
                <h5 className="text-dark card-title">Locked Customers</h5>
                <button
                  className="btn btn-success btn-sm"
                  data-toggle="modal"
                  data-target="#exampleModal"
                >
                  Lock Customer
                </button>
              </div>
              <div className="table-responsive font-small">
                <table className="table table-bordered table-striped tabe-condensed table-sm">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Lock Date</th>
                      <th scope="col">Last Purchase Date</th>
                      <th scope="col">Last Paid</th>
                      <th scope="col">First Name</th>
                      <th scope="col">Last Name</th>
                      <th scope="col">Customer Phone</th>
                    </tr>
                  </thead>
                  <tbody>{lockedCustomerHistory}</tbody>
                </table>
                {count > 10 && (
                  <Pagination
                    page={page}
                    limit={limit}
                    count={count}
                    handleDecrementPage={this.handleDecrementPage}
                    handleIncrementPage={this.handleIncrementPage}
                    handleOnChangePage={this.handleOnChangePage}
                  />
                )}
              </div>
              {/* lock customer Modal */}
              <LockCustomerModal
                phone={phone}
                amount={amount}
                onChange={this.onChange}
                lockCustomer={this.lockCustomer}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

LockCustomer.propTypes = {
  auth: PropTypes.object.isRequired,
  fetchLockedCustomers: PropTypes.func.isRequired,
  lockedCustomers: PropTypes.object.isRequired,
  lockCustomer: PropTypes.func.isRequired,
  lockCustomerMsg: PropTypes.object,
  errors: PropTypes.object,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  lockedCustomers: state.credits.lockedCustomers,
  lockCustomerMsg: state.credits.lockCustomerMsg,
  errors: state.errors,
});
export default connect(mapStateToProps, {
  fetchLockedCustomers,
  lockCustomer,
})(LockCustomer);

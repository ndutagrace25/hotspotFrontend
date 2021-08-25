import React, { Component } from "react";
import { Navbar } from "../common";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import { fetchCustomerPayments } from "../actions/creditActions";
import { Pagination, Preloader } from "../common";
import moment from "moment";
class Payments extends Component {
  state = {
    amount: "",
    phone: "",
    page: 0,
    limit: 10,
    count: 0,
    paymentCount: 0,
    preloaderStyle: "d-none",
    customerPayments: [],
    creditBought: {},
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
      this.setState({ page: newPage, paymentCount: newPage * limit });
      this.fetchCustomerPayments(newPage, limit);
    }
  };

  handleDecrementPage = (e) => {
    e.preventDefault();
    const { page, limit } = this.state;
    const newPage = page - 1;
    if (newPage >= 0) {
      this.setState({ page: newPage, paymentCount: newPage * limit });
      this.fetchCustomerPayments(newPage, limit);
    }
  };

  handleOnChangePage = (e) => {
    const { limit } = this.state;
    const newPage = parseInt(e.target.value);
    this.setState({
      [e.target.name]: newPage,
      paymentCount: newPage * limit,
    });
    this.fetchCustomerPayments(newPage, limit);
  };

  onChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  fetchCustomerPayments = (page, limit) => {
    this.props.fetchCustomerPayments(page, limit);
  };

  buyCredit = () => {
    const { amount, phone, page, limit } = this.state;

    if (amount === "" || phone === "") {
      Swal.fire("Amount & Phone number are required", "", "error");
    } else {
      this.handlePreloaderStyle("d-block");
      let data = { amount, phone };
      this.props.buyCredit(data);
      this.fetchCustomerPayments(page, limit);
      // Swal.fire("Success", "Add the credit from your mpesa stk", "success");

      this.setState({
        phone: "",
        amount: "",
      });
    }
  };

  componentDidMount() {
    const { page, limit } = this.state;
    this.fetchCustomerPayments(page, limit);
    console.log(this.props.auth.agent.id);
    this.interval = setInterval(
      () => this.fetchCustomerPayments(page, limit),
      50000
    );
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.customerPayments !== state.customerPayments) {
      return {
        customerPayments: props.customerPayments.items,
        count: props.customerPayments.rows,
        preloaderStyle: "d-none",
      };
    }
  }

  render() {
    const { auth } = this.props;
    const {
      customerPayments,
      paymentCount,
      page,
      limit,
      count,
      preloaderStyle,
    } = this.state;

    let paymentCountAll = paymentCount + 1;
    console.log(this.props.customerPayments);

    const allPayments =
      customerPayments instanceof Array
        ? customerPayments.map((credit) => (
            <tr key={credit.id}>
              <th scope="row">{paymentCountAll++}</th>
              <td>{moment(credit.created_at).format("LLLL")}</td>
              <td>{"Kes." + credit.amount}</td>
              <td>{credit.first_name}</td>
              <td>{credit.last_name}</td>
              <td>{credit.phone}</td>
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
              <h5 className="text-dark card-title">Customer Payments</h5>
              <div className="table-responsive font-small">
                <table className="table table-bordered table-striped tabe-condensed table-sm">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Payment Date</th>
                      <th scope="col">Amount</th>
                      <th scope="col">First Name</th>
                      <th scope="col">Last Name</th>
                      <th scope="col">Customer Phone</th>
                    </tr>
                  </thead>
                  <tbody>{allPayments}</tbody>
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
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

Payments.propTypes = {
  auth: PropTypes.object.isRequired,
  fetchCustomerPayments: PropTypes.func.isRequired,
  customerPayments: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  customerPayments: state.credits.customerPayments,
});
export default connect(mapStateToProps, {
  fetchCustomerPayments,
})(Payments);

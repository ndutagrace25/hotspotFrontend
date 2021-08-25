import React, { Component } from "react";
import { Navbar } from "../common";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import { fetchCredit, buyCredit } from "../actions/creditActions";
import { Pagination, Preloader } from "../common";
import moment from "moment";
import AddCredit from "./AddCredit";
class AgentCredit extends Component {
  state = {
    amount: "",
    phone: "",
    page: 0,
    limit: 10,
    count: 0,
    creditCount: 0,
    preloaderStyle: "d-none",
    credits: [],
    creditBought: {},
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
      this.fetchCredit(newPage, limit);
    }
  };

  handleDecrementPage = (e) => {
    e.preventDefault();
    const { page, limit } = this.state;
    const newPage = page - 1;
    if (newPage >= 0) {
      this.setState({ page: newPage, creditCount: newPage * limit });
      this.fetchCredit(newPage, limit);
    }
  };

  handleOnChangePage = (e) => {
    const { limit } = this.state;
    const newPage = parseInt(e.target.value);
    this.setState({
      [e.target.name]: newPage,
      creditCount: newPage * limit,
    });
    this.fetchCredit(newPage, limit);
  };

  onChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  fetchCredit = (page, limit) => {
    this.props.fetchCredit(page, limit);
  };

  buyCredit = () => {
    const { amount, phone, page, limit } = this.state;

    if (amount === "" || phone === "") {
      Swal.fire("Amount & Phone number are required", "", "error");
    } else {
      this.handlePreloaderStyle("d-block");
      let data = { amount, phone };
      this.props.buyCredit(data);
      this.fetchCredit(page, limit);
      // Swal.fire("Success", "Add the credit from your mpesa stk", "success");

      this.setState({
        phone: "",
        amount: "",
      });
    }
  };

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/agentLogin");
    }
    const { page, limit } = this.state;
    this.fetchCredit(page, limit);
    console.log(this.props.auth.agent.id);
    this.interval = setInterval(() => this.fetchCredit(page, limit), 50000);
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
    if (props.credits !== state.credits) {
      return {
        credits: props.credits.items,
        count: props.credits.rows,
        preloaderStyle: "d-none",
      };
    }

    if (props.creditBought !== state.creditBought) {
      if (props.creditBought.message === "success") {
        return {
          creditBought: props.creditBought.message,
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
      credits,
      creditCount,
      page,
      limit,
      count,
      preloaderStyle,
    } = this.state;

    let creditCountAll = creditCount + 1;

    const creditHistory =
      credits instanceof Array
        ? credits.map((credit) => (
            <tr key={credit.id}>
              <th scope="row">{creditCountAll++}</th>
              <td>{moment(credit.created_at).format("LLLL")}</td>
              <td>{credit.amount}</td>
              <td>{credit.payment_status_name}</td>
            </tr>
          ))
        : null;

    return (
      <React.Fragment>
        <Navbar firstName={auth.agent.first_name} />
        <Preloader preloaderStyle={preloaderStyle} />
        <div className="container-fluid">
          <div className="d-flex flex-wrap justify-content-end m-3">
            <button
              className="btn btn-success btn-sm"
              data-toggle="modal"
              data-target="#exampleModal"
            >
              Buy Credit
            </button>
          </div>
          <div className="table-responsive font-small">
            <table className="table table-bordered table-striped tabe-condensed table-sm">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Payment Date</th>
                  <th scope="col">Paid</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>{creditHistory}</tbody>
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
          {/* Add Credit Modal */}
          <AddCredit
            phone={phone}
            amount={amount}
            onChange={this.onChange}
            buyCredit={this.buyCredit}
          />
        </div>
      </React.Fragment>
    );
  }
}

AgentCredit.propTypes = {
  auth: PropTypes.object.isRequired,
  fetchCredit: PropTypes.func.isRequired,
  credits: PropTypes.object.isRequired,
  buyCredit: PropTypes.func.isRequired,
  creditBought: PropTypes.object,
  errors: PropTypes.object,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  credits: state.credits.credits,
  creditBought: state.credits.buyCredit,
  errors: state.errors,
});
export default connect(mapStateToProps, {
  fetchCredit,
  buyCredit,
})(AgentCredit);

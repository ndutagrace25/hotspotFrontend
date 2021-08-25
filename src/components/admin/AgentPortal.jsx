import React, { Component } from "react";
import { Navbar, Preloader } from "../common";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { agentRegisterCustomer } from "../actions/customerActions";
import addPayment from "../assets/images/addPayment.png";
import account from "../assets/images/account.png";
import payments from "../assets/images/payments.png";
import profile from "../assets/images/addUser.png";
import lockCustomer from "../assets/images/lockCustomer.png";
import AddCustomer from "./AddCustomer";
import Swal from "sweetalert2";

class AgentPortal extends Component {
  state = {
    phone: "",
    first_name: "",
    last_name: "",
    agent_id: "",
    preloaderStyle: "d-none",
    addCustomerResponse: {},
    errors: {},
    gender: "",
  };

  handlePreloader = (preloaderStyle) => {
    this.setState({
      preloaderStyle,
    });
  };

  onChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  componentDidMount() {
    // console.log(this.props.auth.agent);
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/agentLogin");
    }
    this.setState({
      agent_id: this.props.auth.agent.agent_id,
    });
  }

  static getDerivedStateFromProps(props, state) {
    if (props.errors !== state.errors) {
      return {
        errors: props.errors,
        preloaderStyle: "d-none",
      };
    }
    if (props.addCustomerResponse !== state.addCustomerResponse) {
      if (props.addCustomerResponse.message) {
        return {
          addCustomerResponse: props.addCustomerResponse,
          preloaderStyle: "d-none",
        };
      }
    }
  }

  addCustomer = (e) => {
    e.preventDefault();
    const { first_name, last_name, phone, agent_id, gender } = this.state;
    let data = {
      first_name,
      last_name,
      phone,
      agent_id,
      gender,
    };

    if (phone === "" || gender === "") {
      JSON.stringify(
        Swal.fire("Error", "Kindly fill in customer phone number & gender", "error")
      );
    } else {
      this.handlePreloader("d-block");
      this.props.agentRegisterCustomer(data);
      this.setState({
        first_name: "",
        last_name: "",
        phone: "",
        gender: "",
      });
    }
  };

  render() {
    const { auth } = this.props;
    console.log(auth);
    const { phone, first_name, last_name, preloaderStyle, gender } = this.state;
    return (
      <React.Fragment>
        <Preloader preloaderStyle={preloaderStyle} />
        <Navbar firstName={auth.agent.first_name} />
        <div className="container-fluid">
          <div className="d-flex justify-content-between p-3 mt-5 flex-wrap">
            {/* add payment */}
            <Link
              className="card text-white bg-info mb-3 col-md-4 shadow rounded"
              style={{ maxWidth: "18rem" }}
              to="/customerDetails"
            >
              {/* <div className="card-header">Add Payment</div> */}
              <div className="card-body d-flex align-items-center flex-column">
                <h5 className="card-title">Add Payment</h5>
                <img
                  className="pb-1 img-fluid"
                  style={{ borderRadius: "20px" }}
                  src={addPayment}
                  alt="add payment"
                />
              </div>
            </Link>
            {/* account */}
            <Link
              className="card text-white bg-info mb-3 col-md-4 shadow rounded"
              to="/agentCredit"
              style={{ maxWidth: "18rem" }}
            >
              {/* <div className="card-header">Add Payment</div> */}
              <div className="card-body d-flex align-items-center flex-column">
                <h5 className="card-title">Mawingu Account</h5>
                <img
                  className="pb-1 img-fluid"
                  style={{ borderRadius: "20px" }}
                  src={account}
                  alt="mawingu account"
                />
              </div>
            </Link>
            {/* Add customer */}
            <Link
              className="card text-white bg-info mb-3 col-md-4 shadow rounded"
              style={{ maxWidth: "18rem" }}
              data-toggle="modal"
              data-target="#exampleModal"
              to=""
            >
              {/* <div className="card-header">Add Payment</div> */}
              <div className="card-body d-flex align-items-center flex-column">
                <h5 className="card-title">Add Customer</h5>
                <img
                  className="pb-1 img-fluid"
                  style={{ borderRadius: "20px" }}
                  src={profile}
                  alt="customer"
                />
              </div>
            </Link>
            {/* view payments */}
            <Link
              className="card text-white bg-info mb-3 col-md-4 shadow rounded"
              style={{ maxWidth: "18rem" }}
              to="/payments"
            >
              <div className="card-body d-flex align-items-center flex-column">
                <h5 className="card-title">Payments</h5>
                <img
                  className="pb-1 img-fluid"
                  style={{ borderRadius: "20px" }}
                  src={payments}
                  alt="payment"
                />
              </div>
            </Link>
            {/* lock customer */}
            <Link
              className="card text-white bg-info mb-3 col-md-4 shadow rounded"
              style={{ maxWidth: "18rem" }}
              to="/lockCustomer"
            >
              <div className="card-body d-flex align-items-center flex-column">
                <h5 className="card-title">Lock Customer</h5>
                <img
                  className="pb-1 img-fluid"
                  style={{ borderRadius: "20px" }}
                  src={lockCustomer}
                  alt="lockCustomer"
                />
              </div>
            </Link>
            <AddCustomer
              onChange={this.onChange}
              first_name={first_name}
              last_name={last_name}
              phone={phone}
              addCustomer={this.addCustomer}
              gender={gender}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

AgentPortal.propTypes = {
  agentRegisterCustomer: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object,
  addCustomerResponse: PropTypes.object,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  addCustomerResponse: state.packages.registerCustomer,
  errors: state.errors,
});
export default connect(mapStateToProps, { agentRegisterCustomer })(AgentPortal);

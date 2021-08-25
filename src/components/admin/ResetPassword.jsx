import React, { Component } from "react";
import PropTypes from "prop-types";
import logo from "../assets/images/logo_mawingu.png";
import { connect } from "react-redux";

import { getOTP, resetPassword } from "../actions/authActions";
import { Preloader, HyperLink } from "../common";
import Swal from "sweetalert2";

class ResetPassword extends Component {
  state = {
    phone: "",
    password: "",
    pin: "",
    errors: {},
    preloaderStyle: "d-none",
    confirmPassword: "",
    enterPassword: false,
    otp: {},
  };

  onChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handlePreloaderStyle = (newStyle) => {
    this.setState({ preloaderStyle: newStyle });
  };

  componentDidMount() {
    console.log(window.location.hostname);
    if (window.location.hostname === "portal.mawingunetworks.com") {
      this.props.history.push("/Customer");
    } else if (window.location.hostname === "customer.mawingunetworks.com") {
      this.props.history.push("/Customer");
    } else {
      if (!this.props.auth.isAuthenticated) {
        this.props.history.push("/resetPassword");
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    this.handlePreloaderStyle("d-none");
    if (nextProps.auth.isAuthenticated) {
      this.redirectUser(nextProps.auth);
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.otp) {
      if (nextProps.otp.message) {
        this.setState({
          enterPassword: true,
          errors: {},
        });
      }
    }
  }

  redirectUser = () => {
    this.props.history.push("/agentPortal");
  };

  onSubmitPhone = (e) => {
    e.preventDefault();
    const { phone } = this.state;
    let data = { phone };
    this.props.getOTP(data);
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { password, pin, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      Swal.fire("Error", "Password do not match", "error");
    } else {
      this.handlePreloaderStyle("d-block");

      let data = {
        pin,
        password,
      };
      this.props.resetPassword(data, this.props.history);
    }
  };

  render() {
    const {
      phone,
      password,
      preloaderStyle,
      confirmPassword,
      enterPassword,
      pin,
    } = this.state;
    return (
      <React.Fragment>
        <Preloader preloaderStyle={preloaderStyle} />
        <div className="container-fluid bg">
          <div className="row">
            <div className="col-md-4 col-xs-12 offset-md-4 offset-sm-4">
              <div className="form-container">
                <div className="d-flex justify-content-center">
                  <img
                    className="pb-1 img-fluid"
                    style={{ borderRadius: "20px" }}
                    src={logo}
                    alt="login"
                  />
                </div>
                <h5 className="d-flex justify-content-center text-success">
                  Agent
                </h5>
                {enterPassword ? (
                  <React.Fragment>
                    <form onSubmit={(e) => this.onSubmit(e)}>
                      <div className="form-group">
                        <input
                          className="form-control"
                          placeholder="Pin"
                          name="pin"
                          type="text"
                          value={pin}
                          onChange={this.onChange}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          className="form-control"
                          placeholder="Password"
                          name="password"
                          type="password"
                          value={password}
                          onChange={this.onChange}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          className="form-control"
                          placeholder="Confirm Password"
                          name="confirmPassword"
                          type="password"
                          value={confirmPassword}
                          onChange={this.onChange}
                        />
                      </div>
                      <button
                        type="submit"
                        className="btn btn-success btn-block"
                      >
                        Reset Password
                      </button>
                    </form>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <form onSubmit={(e) => this.onSubmitPhone(e)}>
                      <div className="form-group">
                        <input
                          className="form-control"
                          placeholder="Enter Phone Number"
                          name="phone"
                          value={phone}
                          onChange={this.onChange}
                        />
                      </div>
                      <button
                        type="submit"
                        className="btn btn-success btn-block"
                      >
                        Get OTP
                      </button>
                    </form>
                  </React.Fragment>
                )}
                <div className="d-flex mt-3 justify-content-center">
                  <HyperLink
                    to="/agentLogin"
                    name="Login"
                    className="btn btn-warning btn-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

ResetPassword.propTypes = {
  getOTP: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  resetPassword: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  otp: state.auth.otp,
  password: state.auth.password,
  errors: state.errors,
});

export default connect(mapStateToProps, { getOTP, resetPassword })(
  ResetPassword
);

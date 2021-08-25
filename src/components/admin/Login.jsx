import React, { Component } from "react";
import PropTypes from "prop-types";
import logo from "../assets/images/logo_mawingu.png";
import { connect } from "react-redux";

import { loginAgent } from "../actions/authActions";
import { Preloader, HyperLink } from "../common";

class Login extends Component {
  state = {
    username: "",
    password: "",
    errors: {},
    preloaderStyle: "d-none",
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
    } else if (window.location.hostname === "portaltest.mawingunetworks.com") {
      this.props.history.push("/Customer");
    } else if (window.location.hostname === "customer.mawingunetworks.com") {
      this.props.history.push("/Customer");
    } else {
      if (!this.props.auth.isAuthenticated) {
        this.props.history.push("/agentLogin");
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
  }

  redirectUser = () => {
    this.props.history.push("/agentPortal");
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.handlePreloaderStyle("d-block");
    const { username, password } = this.state;

    let data = {
      username,
      password,
    };
    this.props.loginAgent(data);
  };

  render() {
    const { username, password, preloaderStyle, errors } = this.state;
    // console.log(errors);
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
                <form onSubmit={(e) => this.onSubmit(e)}>
                  <div className="form-group">
                    <input
                      className="form-control"
                      placeholder="Username"
                      name="username"
                      value={username}
                      onChange={this.onChange}
                    />
                  </div>
                  {errors.username && (
                    <div className="alert alert-danger">{errors.username}</div>
                  )}
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
                  {errors.password && (
                    <div className="alert alert-danger">{errors.password}</div>
                  )}
                  <button type="submit" className="btn btn-success btn-block">
                    Login
                  </button>
                  {/* <div className="text-danger">
                    The system is under maintainance we will be back soon, sorry..
                  </div> */}
                </form>
                <div className="d-flex mt-3 justify-content-center">
                  <HyperLink
                    to="/resetPassword"
                    name="Reset Password"
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

Login.propTypes = {
  loginAgent: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { loginAgent })(Login);

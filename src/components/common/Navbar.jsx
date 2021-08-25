import React, { Component } from "react";
import { NavLink, HyperLink } from ".";
import { logoutAgent } from "../actions/authActions";
import { getAgentFloat } from "../actions/creditActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Navbar extends Component {
  state = {
    float: "",
  };

  componentDidMount() {
    // this.interval = setInterval(
    //   () => this.props.getAgentFloat(this.props.auth.personnel.id),
    //   2000
    // );
    this.props.getAgentFloat(this.props.auth.personnel.id);
  }

  // componentWillUnmount() {
  //   clearInterval(this.interval);
  // }

  static getDerivedStateFromProps(props, state) {
    if (props.agentFloat !== state.float) {
      return {
        float: props.agentFloat,
      };
    }
  }

  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutAgent();
    window.location.href = "/agentLogin";
  };

  onResetPasswordClick = (e) => {
    e.preventDefault();
    this.props.logoutAgent();
    window.location.href = "/resetPassword";
  };
  render() {
    const { firstName } = this.props;
    const { float } = this.state;
    return (
      <nav className="navbar navbar-expand-sm navbar-light border-bottom bg-info text-light">
        <div className="navbar-brand" href="#">
          <img
            src={require("../assets/images/mawingu.png")}
            alt="Mawingu Logo"
            className="img-fluid"
            width="45"
          />
        </div>
        <button
          className="navbar-toggler d-lg-none"
          type="button"
          data-toggle="collapse"
          data-target="#collapsibleNavId"
          aria-expanded="false"
          aria-controls="collapsibleNavId"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="container">
          <div className="collapse navbar-collapse" id="collapsibleNavId">
            <span className="mr-4">Prepaid credit Kes. {float}</span>
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
              <NavLink name="Home" to="/agentPortal" />
            </ul>
            <div className="my-2 my-lg-0">
              <div className="nav-item dropdown">
                <div
                  className="nav-link dropdown-toggle"
                  id="userAccount"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {/* <i className="fa fa-user" />{agents.agent_firstName} */}
                  <i className="fa fa-user" />
                  {" " + firstName}
                </div>
                <div className="dropdown-menu" aria-labelledby="userAccount">
                  <HyperLink
                    className="dropdown-item"
                    to="/resetPassword"
                    name="Change Password"
                    onClick={this.onResetPasswordClick}
                  />
                  <HyperLink
                    className="dropdown-item"
                    to=""
                    name="Logout"
                    onClick={this.onLogoutClick}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  getAgentFloat: PropTypes.func.isRequired,
  agentFloat: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  agentFloat: state.credits.agentFloat,
});

export default connect(mapStateToProps, { logoutAgent, getAgentFloat })(Navbar);

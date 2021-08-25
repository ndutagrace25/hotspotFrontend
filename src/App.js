import React, { Component } from "react";
import "@fortawesome/fontawesome-free/css/all.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import store from "./store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utilities/setAuthToken";
import {
  // setCurrentUser,
  loginAgent,
  setCurrentAgent,
  logoutAgent
} from "./components/actions/authActions";
import "./styles.css";
import "./Animate.css";

import CustomerPortal from "./components/customer/CustomerPortal";
import {
  LockCustomer,
  Login,
  AgentPortal,
  CustomerDetails,
  AgentCredit,
  Payments,
  ResetPassword,
} from "./components/admin";

//check for token
if (localStorage.agentJwtToken) {
  //set auth token header
  setAuthToken(localStorage.agentJwtToken);
  //decode token and user info as well as exp
  const decoded = jwt_decode(localStorage.agentJwtToken);
  //set user and is isAuthenticated
  store.dispatch(setCurrentAgent(decoded));

  //check for expired token
  const currentTime = Date.now() / 1000;

  if (decoded.exp < currentTime) {
    //logout user
    store.dispatch(logoutAgent());

    //redirect to login page
    window.location.href = "/agentLogin";
  }
}

class App extends Component {
  state = {};
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/Customer" component={CustomerPortal} />
          <Route exact path="/customer" component={CustomerPortal} />
          <Route exact path="/agentLogin" component={Login} />
          <Route exact path="/resetPassword" component={ResetPassword} />
          <Route exact path="/agentPortal" component={AgentPortal} />
          <Route exact path="/customerDetails" component={CustomerDetails} />
          <Route exact path="/agentCredit" component={AgentCredit} />
          <Route exact path="/payments" component={Payments} />
          <Route exact path="/lockCustomer" component={LockCustomer} />
        </Switch>{" "}
      </Router>
    );
  }
}

export default App;

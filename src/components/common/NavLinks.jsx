import React, { Component } from "react"; 

class NavLinks extends Component {
  render() {
    const {isAuthenticated, personnel} = this.props.auth;
    // console.log(personnel);

    return (
      <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
        <li className="nav-item">
          <a className="nav-link" href="/customers">
            Customers
          </a> 
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/tasks">
            Tasks
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/personnel">
            Personnel
          </a>
        </li>
        <li className="nav-item dropdown">
          <div
            className="nav-link dropdown-toggle"
            href="#"
            id="dropdownId"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Reports
          </div>
          <div className="dropdown-menu" aria-labelledby="dropdownId">
            <a className="dropdown-item" href="/reports/commissions">
              Commissions
            </a>
            <a className="dropdown-item" href="/reports/customers">
              Customers
            </a>
            <a className="dropdown-item" href="/reports/merchats">
              Merchants
            </a>
            <a className="dropdown-item" href="/reports/payments">
              Payments
            </a>
          </div>
        </li>
      </ul>
    );
  }
}

export default NavLinks;

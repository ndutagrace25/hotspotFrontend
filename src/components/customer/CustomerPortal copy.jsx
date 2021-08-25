import React, { Component } from "react";
import logo from "../assets/images/mawingu_white_logo.png";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";
import Swal from "sweetalert2";
import {
  fetchPackages,
  buyPackage,
  fetchCustomerDetails,
  disconnectCustomer,
} from "../actions/customerActions";
import { authorizeUser } from "../actions/authActions";

// import localIPUrl from "local-ip-url";

import BuyPackage from "./BuyPackage";

class CustomerPortal extends Component {
  state = {
    packages: [],
    selectedPackage: "",
    packageAmount: "",
    phone: "",
    accessCode: "",
    customerCode: "",
    customerDetails: {},
    auth: {},
    disconnect: {},
    errors: {},
  };

  onChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  componentDidMount() {
    this.props.fetchPackages();

    let search = this.props.location.search;
    let params = new URLSearchParams(search);

    let access_code = params.get("access_code");
    this.setState({ accessCode: access_code });
    // console.log(access_code);
    if (access_code) {
      let data = {
        access_code,
      };
      this.props.authorizeUser(data);
    }
  }

  buySelectedPackage = () => {
    const { phone, selectedPackage } = this.state;
    let data = {
      package_id: selectedPackage,
      phone,
    };
    this.props.buyPackage(data);
  };

  selectPackage = (packageId, phone) => {
    this.setState({
      selectedPackage: packageId,
      phone,
      disconnect: "connected",
    });
  };

  static getDerivedStateFromProps(props, state) {
    console.log(props.auth);
    if (props.auth !== state.auth) {
      let disconnect = "disconnected";
      if (props.auth.isAuthenticated === true) {
        props.fetchCustomerDetails();
        disconnect = "connected";
      }
      return {
        auth: props.auth,
        accessCode: props.auth.personnel.access_code,
        disconnect,
        phone: props.auth.personnel.phone,
      };
    }
    if (props.customerDetails !== state.customerDetails) {
      return {
        customerDetails: props.customerDetails,
      };
    }

    if (props.packages !== state.packages) {
      return {
        packages: props.packages,
      };
    }

    if (props.disconnect !== state.disconnect) {
      let disconnect = "connected";
      if (
        Object.keys(props.disconnect).length > 0 ||
        typeof props.disconnect === "string"
      ) {
        if (props.disconnect.feedback !== "undefined") {
          disconnect = "disconnected";
          Swal.fire("Not found", props.disconnect.feedback, "error");
        } else {
          // disconnect = "disconnected";
          disconnect = "connected";
          Swal.fire(
            "You have disconnected all your devices from Mawingu WiFi",
            props.disconnect,
            "success"
          );
        }
      } else {
        if (state.disconnect === "connected") {
          disconnect = "connected";
        } else {
          disconnect = "disconnected";
        }
      }
      return {
        disconnect,
        // preloaderStyle: "d-none",
      };
    }
    if (props.errors !== state.errors) {
      let disconnect = "connected";
      if (Object.keys(props.errors).length > 0) {
        disconnect = "disconnected";
      }
      return {
        errors: props.errors,
        disconnect,
      };
    }
  }

  disconnect = () => {
    this.props.disconnectCustomer(this.props.auth.personnel.access_code);
  };

  openPortal = () => {
    const { customerCode } = this.state;
    this.props.authorizeUser({
      access_code: customerCode,
    });
    window.location.href =
      process.env.REACT_APP_PORTAL_LINK +
      "/Customer?access_code=" +
      customerCode;
  };

  enterAccessCode = () => {
    window.location.href = process.env.REACT_APP_PORTAL_LINK + "/Customer";
  };

  render() {
    const {
      packages,
      phone,
      customerDetails,
      disconnect,
      accessCode,
      customerCode,
    } = this.state;

    // console.log(this.props.auth.isOnline);
    let dataRemaining = Math.round(
      customerDetails.totaldatalimit - customerDetails.total
    );

    let percentageRemaining = Math.round(
      (dataRemaining / customerDetails.totaldatalimit) * 100
    );

    const allPackages =
      packages instanceof Array
        ? packages.map((pkge) => (
            <React.Fragment key={pkge.id}>
              <div
                className="col-md-2 rounded bg-secondary d-flex flex-column align-items-center px-0 mb-4 mx-2"
                onClick={() => this.selectPackage(pkge.id, phone)}
                data-toggle="modal"
                data-target={"#buyPackage" + pkge.id}
              >
                <div className="d-flex flex-column mb-2">
                  <div className="d-flex flex-row flex-nowrap align-items-baseline">
                    <span className="price">Ksh.</span>
                    <span className="value">{pkge.price}</span>
                  </div>
                  <div className="font-weight-bold tagLine">{pkge.name}</div>
                </div>
                <div className="font-weight-bold pt-2 px-3 pb-0 font-italic rounded mb-3">
                  <ul>
                    {/* <li>{pkge.download / pkge.download} Mbps Speed</li> */}
                    <li>{pkge.data_limit} Mbs Data Limit</li>
                    <li>{pkge.valid_days} Days Validity</li>
                  </ul>
                </div>
              </div>
              <BuyPackage
                selectedPackage={pkge.id}
                packages={packages}
                onChange={this.onChange}
                phone={phone}
                buySelectedPackage={this.buySelectedPackage}
              />
            </React.Fragment>
          ))
        : null;
    return (
      <React.Fragment>
        <div className="customerWrap">
          <div className="d-flex flex-row-reverse">
            <img className="my-3 img-fluid logo" src={logo} alt="Mawingu" />
          </div>
          <div className="container-fluid">
            <p className="item-1">Connecting you to the world</p>

            <p className="item-2">Affordable internet for all</p>

            <p className="item-3">
              Internet to the community, for the community
            </p>
            {(disconnect === "disconnected" || disconnect === "connected") &&
            (accessCode === null || accessCode === "") ? (
              <div className="row mt-5">
                <div className="col-md-4 offset-md-3 my-2">
                  <input
                    type="password"
                    className="form-control"
                    value={customerCode}
                    name="customerCode"
                    onChange={(e) => this.onChange(e)}
                    placeholder="Enter Access Code"
                  />
                </div>
                <div className="col-md-2 my-2">
                  <div className="d-flex justify-content-center">
                    <button
                      type="button"
                      className="btn bg-secondary"
                      onClick={this.openPortal}
                    >
                      Open My Account
                    </button>
                  </div>
                </div>
              </div>
            ) : disconnect === "disconnected" ? (
              <div className="col-md-8 col-xs-12 form-container ml-auto mr-auto">
                <h1 className="text-secondary">
                  You are disconnected from Mawingu WIFI please connect to
                  continue
                </h1>
                <div className="row mt-2">
                  <div className="col-md-12">
                    <div className="d-flex justify-content-center">
                      <button
                        type="button"
                        className="btn bg-secondary"
                        onClick={this.enterAccessCode}
                      >
                        Enter Access Code
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="col-md-8 col-xs-12 form-container ml-auto mr-auto">
                <div className="userInfo px-4 rounded">
                  <div className="row">
                    <div className="col-md-6">
                      <h5 className="text-center">
                        Hello
                        {customerDetails.first_name !== undefined && (
                          <span style={{ textTransform: "uppercase" }}>
                            {" " +
                              customerDetails.first_name +
                              " " +
                              customerDetails.last_name}
                          </span>
                        )}
                      </h5>
                    </div>
                    <div className="col-md-6 my-3 d-flex justify-content-center">
                      {this.props.auth.isOnline ? (
                        <button
                          className="btn btn-sm btn-mawingu"
                          onClick={this.disconnect}
                        >
                          Disconnect From Network
                        </button>
                      ) : (
                        <span>You are offline, buy bundles</span>
                      )}
                    </div>
                  </div>
                  <div className="row ml-auto">
                    <span className="pr-2 font-weight-bold">
                      Data Remaining:
                    </span>
                    <span className="text-secondary font-weight-bold">
                      {dataRemaining === undefined ||
                      Number.isNaN(dataRemaining) === true ||
                      dataRemaining < 0
                        ? "0"
                        : dataRemaining}{" "}
                      MB
                    </span>
                  </div>
                  {/* <div className="progress mt-1 mb-3">
                    <div
                      className="progress-bar bg-secondary"
                      role="progressbar"
                      style={{
                        width:
                          percentageRemaining === undefined ||
                          Number.isNaN(percentageRemaining) === true
                            ? "0%"
                            : percentageRemaining + "%",
                      }}
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      {percentageRemaining === undefined ||
                      percentageRemaining === NaN
                        ? "0%"
                        : percentageRemaining + "%"}
                    </div>
                  </div> */}
                  <div className="d-flex justify-content-between flex-wrap w-100">
                    <h6 className="col-md-4 ml-0 pl-0">Data Expires on:</h6>
                    <div
                      className="col-md-8 pl-0 text-secondary "
                      style={{ color: "rgba(255, 255, 255, 1)" }}
                    >
                      {moment(customerDetails.expiry_date).format("LLLL")}
                    </div>
                  </div>
                  {/* <div className="d-flex justify-content-between flex-wrap w-100">
                    <h6 className="col-md-4 ml-0 pl-0">Data Transferred:</h6>
                    <div
                      className="col-md-8 pl-0 text-secondary "
                      style={{ color: "rgba(255, 255, 255, 1)" }}
                    >
                      {customerDetails.total} MB
                    </div>
                  </div> */}
                </div>

                <div className="userInfo px-0 rounded">
                  <h5 className="mb-4">Buy Packages</h5>

                  <div className="text-center">
                    <p className="font-weight-bold">
                      Dear customer, you can use our new Till to buy bundles
                      automatically via Mpesa. Go to Lipa na Mpesa, Buy goods,
                      Till <span className="text-secondary">5039633</span>,
                      bundle amount and connect
                    </p>

                    <p className="font-weight-bold">
                      Customer care:{" "}
                      <span className="text-secondary">0716100200</span>
                    </p>
                  </div>

                  <div className="d-flex justify-content-between flex-wrap elem col-md-12">
                    {allPackages}
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="footer-cloud mt-2"></div>
          <footer className="bg-secondary">
            <p className="text-center font-weight-bold">
              © Mawingu Networks Limited 2020
            </p>
          </footer>
        </div>
      </React.Fragment>
    );
  }
}

CustomerPortal.propTypes = {
  fetchPackages: PropTypes.func.isRequired,
  packages: PropTypes.array.isRequired,
  buyPackage: PropTypes.func,
  authorizeUser: PropTypes.func.isRequired,
  customerDetails: PropTypes.object,
  auth: PropTypes.object,
  fetchCustomerDetails: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  packages: state.packages.packages,
  auth: state.auth,
  customerDetails: state.packages.customerDetails,
  disconnect: state.packages.disconnectCustomer,
  errors: state.errors,
});

export default connect(mapStateToProps, {
  fetchPackages,
  buyPackage,
  authorizeUser,
  fetchCustomerDetails,
  disconnectCustomer,
})(CustomerPortal);

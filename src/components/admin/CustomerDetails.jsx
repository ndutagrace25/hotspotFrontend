import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import profile from "../assets/images/profile.png";
import moment from "moment";

import {
  searchCustomer,
  fetchPackages,
  buyPackageAgent,
} from "../actions/customerActions";
import BuyPackage from "./BuyPackage";

import { Navbar, Preloader } from "../common";
class CustomerDetails extends Component {
  state = {
    phone: "",
    customerSearched: {},
    packages: [],
    selectedPackage: "",
    buyPackage: {},
    preloaderStyle: "d-none",
    errors: {},
  };

  handlePreloaderStyle = (newStyle) => {
    this.setState({ preloaderStyle: newStyle });
  };

  onChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  searchCustomer = (e) => {
    e.preventDefault();
    const { phone } = this.state;

    if (phone === "") {
      JSON.stringify(
        Swal.fire("Kindly fill in customer phone number", "", "error")
      );
    } else {
      // this.handlePreloaderStyle("d-block");
      this.props.searchCustomer(phone);
      this.setState({
        phone: "",
      });
    }
  };

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/agentLogin");
    }
    this.props.fetchPackages();
  }

  static getDerivedStateFromProps(props, state) {
    if (props.errors !== state.errors) {
      return {
        errors: props.errors,
        preloaderStyle: "d-none",
      };
    }
    if (props.customerSearched !== state.customerSearched) {
      return {
        customerSearched: props.customerSearched,
        // preloaderStyle: "d-none",
      };
    }
    if (props.packages !== state.packages) {
      return {
        packages: props.packages,
      };
    }

    if (props.buyPackage !== state.buyPackage) {
      return {
        buyPackage: props.buyPackage,
        customerSearched: {},
        preloaderStyle: "d-none",
      };
    }
  }

  selectPackage = (packageId, phone) => {
    this.setState({
      selectedPackage: packageId,
      phone,
    });
  };

  buySelectedPackage = () => {
    const { customerSearched, selectedPackage } = this.state;
    let data = {
      package_id: selectedPackage,
      customer_id: customerSearched.customer_id,
    };
    this.handlePreloaderStyle("d-block");
    this.props.buyPackageAgent(data);
    this.setState({
      customerSearched: {},
    });
  };

  render() {
    const { phone, customerSearched, packages, preloaderStyle } = this.state;
    console.log(customerSearched);

    const { auth } = this.props;

    console.log(packages);

    const allPackages =
      packages instanceof Array && auth.agent.promotion_status === 1
        ? packages
            .filter(
              (DBpackage) => DBpackage.type === "3" && DBpackage.status === 1
            )
            .map((pkge) => (
              <React.Fragment key={pkge.id}>
                <div
                  className="agentcardItem shadow p-3 mb-5 bg-info rounded col-md-2 mt-2 mr-1 text-white text-capitalize "
                  onClick={() => this.selectPackage(pkge.id, phone)}
                  data-toggle="modal"
                  data-target={"#buyPackage" + pkge.id}
                >
                  <div className="border-bottom text-white d-flex justify-content-center font-weight-bold">
                    {pkge.name}
                  </div>
                  <div className="d-flex align-items-center flex-column p-3 font-italic">
                    <h6>{"Ksh. " + pkge.price}</h6>
                    <div>{pkge.data_limit} Mbs Data Limit</div>
                    <div>{pkge.valid_days} Days Validity</div>
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
        : packages instanceof Array && auth.agent.promotion_status !== 1
        ? packages
            .filter((DBpackage) => DBpackage.type === "2")
            .map((pkge) => (
              <React.Fragment key={pkge.id}>
                <div
                  className="agentcardItem shadow p-3 mb-5 bg-info rounded col-md-2 mt-2 mr-1 text-white text-capitalize "
                  onClick={() => this.selectPackage(pkge.id, phone)}
                  data-toggle="modal"
                  data-target={"#buyPackage" + pkge.id}
                >
                  <div className="border-bottom text-white d-flex justify-content-center font-weight-bold">
                    {pkge.name}
                  </div>
                  <div className="d-flex align-items-center flex-column p-3 font-italic">
                    <h6>{"Ksh. " + pkge.price}</h6>
                    <div>{pkge.data_limit} Mbs Data Limit</div>
                    <div>{pkge.valid_days} Days Validity</div>
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
        <Preloader preloaderStyle={preloaderStyle} />
        <Navbar firstName={auth.agent.first_name} />
        <div className="container-fluid">
          <React.Fragment>
            <div className="d-flex justify-content-between flex-wrap">
              {customerSearched instanceof Object &&
                Object.keys(customerSearched).length > 0 && (
                  <div className="col-md-4 mt-3 ml-2 p-2 d-flex flex-wrap flex-row border rounded shadow text-monospace text-dark">
                    <div className="d-flex align-items-center flex-column font-weight-bold">
                      <img src={profile} alt="profile" />
                      <div className="">
                        {customerSearched.first_name +
                          " " +
                          customerSearched.last_name}
                      </div>
                    </div>
                    <div className="ml-2 pt-2 pb-2">
                      <div className="d-flex flex-row justify-content-between p-1 flex-wrap">
                        <div className="mr-2">Phone Number:</div>
                        <div className="ml-0 pl-0">
                          {customerSearched.phone}
                        </div>
                      </div>
                      <div className="d-flex flex-row justify-content-between p-1 flex-wrap">
                        <div className="mr-2">Active Package:</div>
                        <div className="ml-0 pl-0 capitalize">
                          {customerSearched.active_package}
                        </div>
                      </div>
                      <div className="d-flex flex-row justify-content-between p-1 flex-wrap">
                        <div className="mr-2">Expiration Date:</div>
                        <div className="ml-0 pl-0">
                          {moment(customerSearched.expiry_date).format("LLL")}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

              <div className="shadow p-3 col-md-3 mt-3">
                <form onSubmit={(e) => this.searchCustomer(e)}>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter customer phone"
                      name="phone"
                      value={phone}
                      onChange={this.onChange}
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary btn-block btn-sm"
                  >
                    Search customer
                  </button>
                </form>
              </div>
            </div>
          </React.Fragment>
          {/* // Packages */}
          {customerSearched instanceof Object &&
            Object.keys(customerSearched).length > 0 && (
              <div className="mt-4 ml-2 p-2 d-flex justify-content-between flex-wrap">
                {allPackages}
              </div>
            )}
        </div>
      </React.Fragment>
    );
  }
}

CustomerDetails.propTypes = {
  fetchPackages: PropTypes.func.isRequired,
  packages: PropTypes.array.isRequired,
  customerSearched: PropTypes.object,
  auth: PropTypes.object,
  searchCustomer: PropTypes.func.isRequired,
  buyPackageAgent: PropTypes.func,
  buyPackage: PropTypes.object,
  errors: PropTypes.object,
};

const mapStateToProps = (state) => ({
  customerSearched: state.packages.customerSearched,
  auth: state.auth,
  packages: state.packages.packages,
  buyPackage: state.packages.buyPackage,
  errors: state.errors,
});
export default connect(mapStateToProps, {
  searchCustomer,
  fetchPackages,
  buyPackageAgent,
})(CustomerDetails);

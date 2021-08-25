import React, { Component } from "react";

class BuyPackage extends Component {
  render() {
    const { selectedPackage, packages, phone } = this.props;

    const packageDetails =
      packages instanceof Array
        ? packages
            .filter((pkg) => pkg.id === selectedPackage)
            .map((pkge) => (
              <div className="modal-content" key={pkge.id}>
                <div className="modal-header">
                  <h6 className="modal-title text-secondary font-weight-bold">
                    Please Confirm MPESA Purchase Below:
                  </h6>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span
                      aria-hidden="true"
                      className="text-secondary font-weight-bold"
                    >
                      &times;
                    </span>
                  </button>
                </div>
                <div className="modal-body">
                  <div
                    className="rounded d-flex flex-column align-items-center px-0 mb-4 mx-2"
                    key={pkge.id}
                  >
                    <div className="d-flex flex-column mb-2">
                      <div className="d-flex flex-row flex-nowrap align-items-baseline">
                        <span className="price">Ksh.</span>
                        <span className="value">{pkge.price}</span>
                      </div>
                      <div className="tagLine">{pkge.name}</div>
                    </div>
                    <div className="pt-2 px-3 pb-0 font-italic rounded mb-3">
                      <ul>
                        <li>{pkge.data_limit} Mbs Data Limit</li>
                        <li>{pkge.valid_days} Days Validity</li>
                      </ul>
                    </div>
                  </div>
                  <div className="input-group mb-3 col-md-11">
                    <div className="input-group-prepend">
                      <span className="input-group-text font-weight-bold">
                        Phone
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      value={phone}
                      name="phone"
                      onChange={(e) => this.props.onChange(e)}
                      placeholder="Phone Number"
                    />
                  </div>
                </div>
                <div className="modal-footer d-flex justify-content-between">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn bg-secondary"
                    onClick={this.props.buySelectedPackage}
                    data-dismiss="modal"
                  >
                    Confirm purchase
                  </button>
                </div>
              </div>
            ))
        : null;
    return (
      <React.Fragment>
        <div
          className="modal fade"
          id={"buyPackage" + selectedPackage}
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
          data-backdrop="static"
        >
          <div className="modal-dialog modal-sm">{packageDetails}</div>
        </div>
      </React.Fragment>
    );
  }
}

export default BuyPackage;

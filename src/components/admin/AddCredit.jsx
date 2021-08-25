import React, { Component } from "react";
class AddCredit extends Component {
  state = {};
  render() {
    const { phone, amount } = this.props;
    return (
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h6 className="modal-title" id="exampleModalLabel">
                Buy Credit
              </h6>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="input-group mb-3 col-md-11">
                <div className="input-group-prepend">
                  <span className="input-group-text font-weight-bold">
                    Amount
                  </span>
                </div>
                <input
                  type="number"
                  className="form-control"
                  value={amount}
                  name="amount"
                  onChange={(e) => this.props.onChange(e)}
                  placeholder="Enter Amount"
                />
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
                  placeholder="Enter Phone Number"
                />
              </div>
            </div>
            <div className="modal-footer d-flex justify-content-between">
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={this.props.buyCredit}
                data-dismiss="modal"
              >
                Buy Credit
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddCredit;

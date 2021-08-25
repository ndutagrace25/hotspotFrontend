import React, { Component } from "react";
class LockCustomerModal extends Component {
  state = {};
  render() {
    const { phone } = this.props;
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
                Lock Customer
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
                    Phone
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  value={phone}
                  name="phone"
                  onChange={(e) => this.props.onChange(e)}
                  placeholder="Enter Customer Phone Number"
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
                onClick={this.props.lockCustomer}
                data-dismiss="modal"
              >
                Lock Customer
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LockCustomerModal;

import React, { Component } from "react";
class AddCustomer extends Component {
  state = {};
  render() {
    const { first_name, last_name, phone, gender } = this.props;

    return (
      <React.Fragment>
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
                  Register Customer
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
                      First Name
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    value={first_name}
                    name="first_name"
                    onChange={(e) => this.props.onChange(e)}
                    placeholder="Enter First Name"
                  />
                </div>
                <div className="input-group mb-3 col-md-11">
                  <div className="input-group-prepend">
                    <span className="input-group-text font-weight-bold">
                      Last Name
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    value={last_name}
                    name="last_name"
                    onChange={(e) => this.props.onChange(e)}
                    placeholder="Enter Last Name"
                  />
                </div>
                <div className="input-group mb-3 col-md-11">
                  <div className="input-group-prepend">
                    <span className="input-group-text font-weight-bold">
                      Phone
                    </span>
                  </div>
                  <input
                    type="number"
                    className="form-control"
                    value={phone}
                    name="phone"
                    onChange={(e) => this.props.onChange(e)}
                    placeholder="Enter Phone Number"
                  />
                </div>
                <div class="input-group mb-3 col-md-11">
                  <div className="input-group-prepend">
                    <span className="input-group-text font-weight-bold">
                      Gender
                    </span>
                  </div>
                  <select
                    class="form-select form-control"
                    aria-label="Default select example"
                    id="gender"
                    value={gender}
                    name="gender"
                    onChange={(e) => this.props.onChange(e)}
                  >
                    <option selected>Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
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
                  onClick={this.props.addCustomer}
                  data-dismiss="modal"
                >
                  Register Customer
                </button>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default AddCustomer;

import React, { Component } from "react";
import PropTypes from "prop-types";

class Pagination extends Component {
  render() {
    const { page, limit, count } = this.props;

    let pages;
    let totalPages = 0;

    if (count > 0) {
      totalPages = Math.ceil(count / limit);

      const allPages = Array.from(Array(totalPages).keys());
      if (allPages.length > 0) {
        pages = allPages.map(pg => (
          <option key={pg} value={pg}>
            {pg + 1}
          </option>
        ));
      } else {
        pages = null;
      }
    } else {
      pages = null;
    }

    return (
      <div className="card-footer" data-test="PaginationComponent">
        <div className="d-flex flex-row-reverse align-items-center">
          <form noValidate onSubmit={this.props.handleIncrementPage}>
            <button
              className="btn btn-sm btn-primary"
              type="submit"
              data-toggle="tooltip"
              data-placement="top"
              title="Next Page"
            >
              <i className="fas fa-chevron-right" />
            </button>
          </form>
          <form noValidate onSubmit={this.props.handleDecrementPage} className="mr-1 ml-1">
            <button
              className="btn btn-sm btn-primary"
              type="submit"
              data-toggle="tooltip"
              data-placement="top"
              title="Previous Page"
            >
              <i className="fas fa-chevron-left" />
            </button>
          </form>
          <span className="font-weight-normal">of {totalPages}</span>
          <select
            name="page"
            id="page"
            className="form-control-sm mr-2"
            value={page}
            onChange={this.props.handleOnChangePage}
          >
            {pages}
          </select>
          <span className="font-weight-normal mr-2">Page</span>
        </div>
      </div>
    );
  }
}

Pagination.propTypes = {
  page: PropTypes.number,
  limit: PropTypes.number,
  count: PropTypes.number,
  handleDecrementPage: PropTypes.func,
  handleIncrementPage: PropTypes.func,
  handleOnChangePage: PropTypes.func
};

export default Pagination;

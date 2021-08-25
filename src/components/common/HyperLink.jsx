import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const HyperLink = ({ name, to, className, onClick }) => {
  return (
    <Link className={className} to={to} onClick={onClick}>
      {name}
    </Link>
  );
};

HyperLink.propTypes = {
  name: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  onClick: PropTypes.func
};

export default HyperLink;

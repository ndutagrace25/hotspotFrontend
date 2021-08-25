import React from "react";
import PropTypes from "prop-types";
import HyperLink from "./HyperLink";

const NavLink = ({ name, to }) => {
  return (
    <li className="nav-item">
      <HyperLink className="nav-link text-light" to={to} name={name} />
    </li>
  );
};

NavLink.propTypes = {
  name: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired
};

export default NavLink;

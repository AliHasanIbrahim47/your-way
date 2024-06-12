import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import PropTypes from "prop-types";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { token, role } = useContext(AuthContext);
  console.log("Token:", token);
  console.log("Role:", role);
  console.log("AllowedRoles:", allowedRoles);

  if (!token || !role || !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

ProtectedRoute.defaultProps = {
  allowedRoles: [],
};

export default ProtectedRoute;

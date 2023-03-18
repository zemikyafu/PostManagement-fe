import React, { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const authContext = useContext(AuthContext);
  // const { isAuthenticated } = authContext;
  const isAuthenticated = sessionStorage.isAuthenticated;

  if (isAuthenticated !== "true") {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;

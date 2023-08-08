import React from "react";
import { Route, useNavigate } from "react-router-dom";

const PrivateRoute = ({ element: Element, ...rest }) => {
  // Your authentication logic here for private routes
  // Replace the following line with your actual authentication check
  const isAuthenticated = true;

  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate("/login", { replace: true });
    return null; // Return null to prevent rendering the component
  }

  return <Route {...rest} element={<Element />} />;
};

export default PrivateRoute;

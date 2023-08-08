import React from "react";
import { Route, useNavigate } from "react-router-dom";

const AdminRoute = ({ element: Element, ...rest }) => {
  // Your authentication logic here for admin routes
  // Replace the following line with your actual authentication check
  const isAdmin = true;

  const navigate = useNavigate();

  if (!isAdmin) {
    navigate("/login", { replace: true });
    return null; // Return null to prevent rendering the component
  }

  return <Route {...rest} element={<Element />} />;
};

export default AdminRoute;

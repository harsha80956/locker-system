import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../actions/authActions";

const Headers = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isAdmin, setIsAdmin] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem("role");
    if (data) {
      setIsAuthenticated(true);
      setIsAdmin(data);
    }
  }, []);

  const handleLogout = () => {
    // Dispatch the logout action
    dispatch(logout());

    // Redirect to the login page after logout
    navigate("/login");
  };

  return isAuthenticated ? (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/admin/dashboard">
          Admin Panel
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            {isAdmin === "admin" && (
              <li className="nav-item">
                <Link className="nav-link" to="/admin/dashboard">
                  Dashboard
                </Link>
              </li>
            )}
            {isAdmin === "admin" && (
              <li className="nav-item">
                <Link className="nav-link" to="/admin/create-locker">
                  Create Lockers
                </Link>
              </li>
            )}
            {isAdmin === "user" && (
              <li className="nav-item">
                <Link className="nav-link" to="/user/lockers">
                  User Locker
                </Link>
              </li>
            )}
            <li className="nav-item">
              <button className="btn btn-link nav-link" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  ) : (
    <span></span>
  );
};
export default Headers;

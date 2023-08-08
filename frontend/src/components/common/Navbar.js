import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../actions/authActions";

const Navbar = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logout());
  };

  const userLinks = (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <Link className="nav-link" to="/user/lockers">
          My Lockers
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/user/booking">
          Book Locker
        </Link>
      </li>
      <li className="nav-item">
        <button className="btn btn-link nav-link" onClick={onLogout}>
          Logout
        </button>
      </li>
    </ul>
  );

  const adminLinks = (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <Link className="nav-link" to="/admin/dashboard">
          Dashboard
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/admin/create-locker">
          Create Locker
        </Link>
      </li>
      <li className="nav-item">
        <button className="btn btn-link nav-link" onClick={onLogout}>
          Logout
        </button>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <Link className="nav-link" to="/login">
          Login
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/signup">
          Sign Up
        </Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand" to="/">
        Mall Lockers
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
        {isAuthenticated
          ? user && user.role === "admin"
            ? adminLinks
            : userLinks
          : guestLinks}
      </div>
    </nav>
  );
};

export default Navbar;

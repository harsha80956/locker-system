import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "../css/Header.css";

const Header = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Implement logout logic here (clear the JWT token, etc.)
    localStorage.clear();
    navigate("/login");
  };

  return (
    <header className="header">
      <nav>
        <ul style={{ direction: "rtl" }}>
          {/* <li>
            <Link to="/">Home</Link>
          </li> */}
          {isAuthenticated ? (
            <>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
              <li style={{ marginTop: "10px" }}>
                <Link to="/bookings">Bookings</Link>
              </li>
              <li style={{ marginTop: "10px" }}>
                <Link to="/">Lockers</Link>
              </li>
            </>
          ) : (
            <></>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;

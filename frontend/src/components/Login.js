import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../actions/userActions";
import "../css/LoginPage.css";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = { email, password };
      const response = await dispatch(login(userData));

      if (response) {
        navigation("/");
        // Redirect to a protected page or handle as needed
      } else {
        setError(response.message);
      }
    } catch (error) {
      setError("An error occurred during login.");
    }
  };

  return (
    <div className="login-page mt-5">
      <div className="login-container">
        <h2>Login</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit">Login</button>

          <span className="mt-3">
            Do you want to register?{" "}
            <Link onClick={(_event) => (window.location.href = "/register")}>
              Register
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;

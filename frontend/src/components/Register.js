import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../actions/userActions";
import "../css/RegisterPage.css";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    nationality: "",
    contactNumber: "",
  });
  const [error, setError] = useState("");
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(register(formData));

      // Check if registration was successful
      if (response) {
        navigation("/");
        // Handle successful registration, e.g., show a success message or redirect to a new page
        console.log("Registration successful!");
      } else {
        setError(response.message);
      }
    } catch (error) {
      // Handle error (e.g., display an error message)
      console.error("Registration failed:", error.message);
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="nationality"
            placeholder="Nationality"
            value={formData.nationality}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="contactNumber"
            placeholder="Contact Number"
            value={formData.contactNumber}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <button type="submit">Register</button>
        </div>
        <span>
          Already a member?{" "}
          <Link onClick={(_event) => (window.location.href = "/login")}>
            Login
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Register;

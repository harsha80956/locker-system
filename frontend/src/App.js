import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
// Other imports...

// Import your components for different routes
import Login from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import Dashboard from "./containers/admin/Dashboard";
import CreateLocker from "./containers/admin/CreateLocker";
import UserLockers from "./containers/user/UserLockers";
import BookingPage from "./containers/user/BookingPage";
import PaymentPage from "./containers/user/PaymentPage";

const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return !!token; // Return true if the token exists, false otherwise.
};

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUpForm />} />

          {/* Admin Routes */}
          <Route path="/admin/*" element={<AdminPanel />} />

          {/* User Routes */}
          <Route path="/user/*" element={<UserPanel />} />

          {/* Default Route */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

const AdminPanel = () => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/create-locker" element={<CreateLocker />} />
    </Routes>
  );
};

const UserPanel = () => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }
  return (
    <Routes>
      <Route path="/lockers" element={<UserLockers />} />
      <Route path="/booking" element={<BookingPage />} />
      <Route path="/lockers/:id" element={<PaymentPage />} />
    </Routes>
  );
};

export default App;

import axios from "axios";

// Base URL for your API
const baseURL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 5000,
});

// Intercept every request and set the Authorization header if a token exists
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    // Set other headers if needed
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// Optional: Handle response errors globally
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle specific error codes (e.g., 401 Unauthorized)
    if (error.response.status === 401) {
      localStorage.removeItem("token");
      // You might want to redirect to login or show a message
      // Do something based on other error codes if needed
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

import axiosInstance from "../api/axiosConfig";
import {
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from "../utils/types";
import { useNavigate } from "react-router";

// Helper function to set the Authorization header with the JWT token
const setAuthToken = (token) => {
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
};

// Load User from token
// Action to load the logged-in user
export const loadUser = () => async (dispatch) => {
  const navigate = useNavigate();
  try {
    // Get the token from localStorage
    const token = localStorage.getItem("token");
    if (token) {
      // Set the token in the Authorization header
      setAuthToken(token);

      // Set the headers with the token
      // const headers = {
      //   Authorization: `Bearer ${token}`,
      // };

      // Make a GET request to the backend API to fetch the user details
      const response = await axiosInstance.get("auth/user/me");
      dispatch({
        type: USER_LOADED,
        payload: response.data,
      });
      navigate("/user/lockers");
      // Dispatch the SET_CURRENT_USER action with the user data
    }
  } catch (err) {
    // If there's an error, dispatch the AUTH_ERROR action
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register User
export const signupUser =
  ({ username, email, password, nationality }) =>
  async (dispatch) => {
    const body = JSON.stringify({ username, email, password, nationality });

    try {
      const response = await axiosInstance.post("/auth/register", body);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: response.data,
      });
      dispatch(loadUser()); // Load user upon successful registration
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.message,
      });
    }
  };

// Login User
export const login =
  ({ email, password }) =>
  async (dispatch) => {
    const body = JSON.stringify({ email, password });

    try {
      const response = await axiosInstance.post("/auth/login", body);
      localStorage.setItem("token", response.data.token);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: response.data,
      });
      dispatch(loadUser()); // Load user upon successful login
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.message,
      });
    }
  };

// Logout / Clear Profile
export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};

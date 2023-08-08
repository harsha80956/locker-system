import axiosInstance from "../api/axiosConfig"; // Assuming you have a file that configures axios with base URL, etc.
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGOUT,
  USER_LOADED,
  AUTH_ERROR,
} from "./types";

// Load User based on token (JWT)
export const loadUser = () => async (dispatch) => {
  try {
    const response = await axiosInstance.get("/auth/me");
    dispatch({
      type: USER_LOADED,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Login User
export const loginUser = (formData) => async (dispatch) => {
  try {
    const response = await axiosInstance.post("/auth/login", formData);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: response.data,
    });
    dispatch(loadUser()); // Load user upon successful login
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Signup User
export const signupUser = (formData) => async (dispatch) => {
  try {
    const response = await axiosInstance.post("/auth/signup", formData);
    dispatch({
      type: SIGNUP_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: SIGNUP_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Logout
export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};

export const setAuthToken = (token) => {
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
};

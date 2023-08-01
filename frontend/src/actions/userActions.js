import axios from "axios";

export const login = (userData) => async (dispatch) => {
  try {
    const response = await axios.post("http://localhost:4000/login", userData);
    dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
    localStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error) {
    dispatch({ type: "LOGIN_FAILURE", payload: error.message });
    throw error;
  }
};

export const register = (userData) => async (dispatch) => {
  try {
    const response = await axios.post(
      "http://localhost:4000/register",
      userData
    );
    dispatch({ type: "REGISTER_SUCCESS", payload: response.data });
    localStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error) {
    dispatch({ type: "REGISTER_FAILURE", payload: error.message });
    throw error;
  }
};

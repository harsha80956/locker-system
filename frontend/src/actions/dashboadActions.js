import axiosInstance from "../api/axiosConfig";
import { FETCH_DASHBOARD_SUCCESS, FETCH_DASHBOARD_FAIL } from "../utils/types";

export const getAdminDashboard = () => async (dispatch) => {
  try {
    const response = await axiosInstance.get("/dashboard");
    dispatch({
      type: FETCH_DASHBOARD_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_DASHBOARD_FAIL,
    });
  }
};

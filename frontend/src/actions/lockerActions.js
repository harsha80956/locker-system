import axiosInstance from "../api/axiosConfig";
import {
  GET_LOCKERS,
  LOCKER_ERROR,
  ADD_LOCKER,
  DELETE_LOCKER,
  UPDATE_LOCKER_STATUS,
} from "../utils/types";

// Get all lockers
export const getLockers = () => async (dispatch) => {
  try {
    const response = await axiosInstance.get("/lockers");
    dispatch({
      type: GET_LOCKERS,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: LOCKER_ERROR,
      payload: err.response.data.message,
    });
  }
};

// Add a new locker
export const addLocker = (lockerData) => async (dispatch) => {
  try {
    const response = await axiosInstance.post("/lockers/add", lockerData);
    dispatch({
      type: ADD_LOCKER,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: LOCKER_ERROR,
      payload: err.response.data.message,
    });
  }
};

// Update locker status
export const updateLockerStatus = (lockerId, status) => async (dispatch) => {
  try {
    const response = await axiosInstance.patch(`/lockers/${lockerId}/update`, {
      status,
    });
    dispatch({
      type: UPDATE_LOCKER_STATUS,
      payload: { lockerId, status: response.data.status },
    });
  } catch (err) {
    dispatch({
      type: LOCKER_ERROR,
      payload: err.response.data.message,
    });
  }
};

// Delete a locker
export const deleteLocker = (lockerId) => async (dispatch) => {
  try {
    await axiosInstance.delete(`/lockers/${lockerId}`);
    dispatch({
      type: DELETE_LOCKER,
      payload: lockerId,
    });
  } catch (err) {
    dispatch({
      type: LOCKER_ERROR,
      payload: err.response.data.message,
    });
  }
};

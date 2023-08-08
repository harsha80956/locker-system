import axiosInstance from "../api/axiosConfig";
import {
  GET_BOOKINGS,
  BOOKING_ERROR,
  ADD_BOOKING,
  DELETE_BOOKING,
  UPDATE_BOOKING_STATUS,
} from "../utils/types";

// Get all bookings for a user
export const getUserBookings = (userId) => async (dispatch) => {
  try {
    const response = await axiosInstance.get(`/bookings/user/${userId}`);
    dispatch({
      type: GET_BOOKINGS,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: BOOKING_ERROR,
      payload: err.response.data.message,
    });
  }
};

// Add a new booking
export const addBooking = (bookingData) => async (dispatch) => {
  try {
    const response = await axiosInstance.post("/bookings/add", bookingData);
    dispatch({
      type: ADD_BOOKING,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: BOOKING_ERROR,
      payload: err.response.data.message,
    });
  }
};

// Update booking status (for example: "active", "completed", "cancelled")
export const updateBookingStatus = (bookingId, status) => async (dispatch) => {
  try {
    const response = await axiosInstance.patch(
      `/bookings/${bookingId}/update`,
      { status }
    );
    dispatch({
      type: UPDATE_BOOKING_STATUS,
      payload: { bookingId, status: response.data.status },
    });
  } catch (err) {
    dispatch({
      type: BOOKING_ERROR,
      payload: err.response.data.message,
    });
  }
};

// Delete a booking
export const deleteBooking = (bookingId) => async (dispatch) => {
  try {
    await axiosInstance.delete(`/bookings/${bookingId}`);
    dispatch({
      type: DELETE_BOOKING,
      payload: bookingId,
    });
  } catch (err) {
    dispatch({
      type: BOOKING_ERROR,
      payload: err.response.data.message,
    });
  }
};

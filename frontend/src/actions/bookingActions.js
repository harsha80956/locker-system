import axios from "axios";

export const makeBooking = (bookingData) => async (dispatch) => {
  try {
    // Get the JWT token from local storage
    const token = localStorage.getItem("token");

    // Set the token in the request headers
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post("/bookings", bookingData, config);
    dispatch({ type: "BOOKING_SUCCESS", payload: response.data });
    // You can add any additional logic or notifications here on successful booking
  } catch (error) {
    dispatch({ type: "BOOKING_FAILURE", payload: error.message });
    // Handle any errors or display error messages here
  }
};

// Action to fetch the booking list with JWT token
export const fetchBookings = () => async (dispatch) => {
  try {
    dispatch({ type: "FETCH_BOOKINGS_REQUEST" });

    // Get the JWT token from local storage
    const token = localStorage.getItem("token");

    // Set the token in the request headers
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // Replace 'api/bookings' with the actual backend API endpoint to fetch bookings
    const response = await axios.get("/bookings", config);

    dispatch({ type: "FETCH_BOOKINGS_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "FETCH_BOOKINGS_FAILURE", payload: error.message });
  }
};

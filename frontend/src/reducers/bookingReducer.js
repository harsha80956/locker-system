const initialState = {
  bookings: [],
  loading: false,
  error: null,
};

const bookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case "BOOKING_SUCCESS":
      return {
        ...state,
        bookingData: action.payload,
        error: null,
      };
    case "BOOKING_FAILURE":
      return {
        ...state,
        bookingData: null,
        error: action.payload,
      };
    case "FETCH_BOOKINGS_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "FETCH_BOOKINGS_SUCCESS":
      return {
        ...state,
        bookings: action.payload,
        loading: false,
        error: null,
      };
    case "FETCH_BOOKINGS_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default bookingReducer;

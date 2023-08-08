const initialState = {
  bookings: [],
  currentBooking: null,
  loading: false,
  error: null,
};

const bookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case "BOOKINGS_LOADING":
      return {
        ...state,
        loading: true,
      };
    case "BOOKINGS_LOADED":
      return {
        ...state,
        bookings: action.payload,
        loading: false,
      };
    case "CREATE_BOOKING":
      return {
        ...state,
        bookings: [...state.bookings, action.payload],
        currentBooking: action.payload,
        loading: false,
      };
    case "BOOKING_ERROR":
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default bookingReducer;

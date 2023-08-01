import {
  FETCH_LOCKERS_SUCCESS,
  BOOK_LOCKER_SUCCESS,
} from "../actions/lockerActions";

const initialState = [];

const lockerReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LOCKERS_SUCCESS:
      return action.payload;
    case BOOK_LOCKER_SUCCESS:
      // Update the locker availability status in the state
      return state.map((locker) =>
        locker._id === action.payload
          ? { ...locker, availabilityStatus: "booked" }
          : locker
      );
    default:
      return state;
  }
};

export default lockerReducer;

import axios from "axios";

// Action types
export const FETCH_LOCKERS_SUCCESS = "FETCH_LOCKERS_SUCCESS";
export const BOOK_LOCKER_SUCCESS = "BOOK_LOCKER_SUCCESS";

// Action creators
export const fetchLockersSuccess = (lockers) => ({
  type: FETCH_LOCKERS_SUCCESS,
  payload: lockers,
});

export const bookLockerSuccess = (lockerID) => ({
  type: BOOK_LOCKER_SUCCESS,
  payload: lockerID,
});

// Thunk to fetch lockers data
export const fetchLockers = () => async (dispatch) => {
  try {
    const response = await axios.get("/lockers");
    dispatch(fetchLockersSuccess(response.data));
  } catch (error) {
    console.error("Failed to fetch lockers:", error.message);
  }
};

// Thunk to book a locker
export const bookLocker = (lockerID) => async (dispatch) => {
  try {
    const response = await axios.post(`/lockers/${lockerID}/book`);
    dispatch(bookLockerSuccess(lockerID));
  } catch (error) {
    console.error(`Failed to book locker ${lockerID}:`, error.message);
  }
};

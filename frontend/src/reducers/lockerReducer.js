import {
  ADD_LOCKER,
  GET_LOCKERS,
  LOCKER_ERROR,
  DELETE_LOCKER,
  UPDATE_LOCKER_STATUS,
} from "../utils/types";

const initialState = {
  lockers: [],
  loading: true,
  error: null,
};

const lockerReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LOCKERS:
      return {
        ...state,
        lockers: action.payload,
        loading: false,
        error: null,
      };
    case ADD_LOCKER:
      return {
        ...state,
        lockers: [...state.lockers, action.payload],
        loading: false,
        error: null,
      };
    case DELETE_LOCKER:
      return {
        ...state,
        lockers: state.lockers.filter(
          (locker) => locker._id !== action.payload
        ),
        loading: false,
        error: null,
      };
    case UPDATE_LOCKER_STATUS:
      return {
        ...state,
        lockers: state.lockers.map((locker) =>
          locker._id === action.payload.lockerId
            ? { ...locker, status: action.payload.status }
            : locker
        ),
        loading: false,
        error: null,
      };
    case LOCKER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default lockerReducer;

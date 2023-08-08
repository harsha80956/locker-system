import { FETCH_DASHBOARD_SUCCESS, FETCH_DASHBOARD_FAIL } from "../utils/types";

const initialState = {
  activeBookings: 0,
  availableLockers: 0,
  totalBookings: 0,
  totalLockers: 0,
  loading: true,
  error: null,
};

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DASHBOARD_SUCCESS:
      return {
        ...state,
        activeBookings: action.payload.activeBookings,
        availableLockers: action.payload.availableLockers,
        totalBookings: action.payload.totalBookings,
        totalLockers: action.payload.totalLockers,
        loading: false,
        error: null,
      };
    case FETCH_DASHBOARD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default dashboardReducer;

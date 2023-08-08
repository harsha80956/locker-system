import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import authReducer from "./reducers/authReducer";
import lockerReducer from "./reducers/lockerReducer";
import bookingReducer from "./reducers/bookingReducer";
import dashboardReducer from "./reducers/dashboardReducer";

// Combine all the reducers
const rootReducer = combineReducers({
  auth: authReducer,
  locker: lockerReducer,
  booking: bookingReducer,
  dashboard: dashboardReducer,
});

// Create the Redux store
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;

import { combineReducers } from "redux";
import authReducer from "./authReducer";
import lockerReducer from "./lockerReducer";
import bookingReducer from "./bookingReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  locker: lockerReducer,
  booking: bookingReducer,
});

export default rootReducer;

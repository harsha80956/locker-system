import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import userReducer from "./reducers/userReducer";
import lockerReducer from "./reducers/lockerReducer";
import bookingReducer from "./reducers/bookingReducer";

const rootReducer = combineReducers({
  user: userReducer,
  lockers: lockerReducer,
  bookings: bookingReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;

import { combineReducers } from "redux";
import addUser from "./addUserReducer";
import isLoggedIn from "./isLoggedInReducer";
import setUserId from "./setUserIdReducer";

export default combineReducers({
  addUser: addUser,
  isLoggedIn: isLoggedIn,
  setActiveUser: setUserId,
});

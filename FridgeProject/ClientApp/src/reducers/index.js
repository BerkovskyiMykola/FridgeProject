import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import fridge from "./fridge";

export default combineReducers({
    auth,
    message,
    fridge
});
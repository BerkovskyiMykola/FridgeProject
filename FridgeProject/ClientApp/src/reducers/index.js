import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import fridge from "./fridge";
import subscriber from "./subscriber";

export default combineReducers({
    auth,
    message,
    fridge,
    subscriber
});
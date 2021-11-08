import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import fridge from "./fridge";
import subscriber from "./subscriber";
import product from "./product";

export default combineReducers({
    auth,
    message,
    fridge,
    subscriber,
    product
});
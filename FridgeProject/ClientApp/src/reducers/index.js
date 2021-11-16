import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import fridge from "./fridge";
import subscriber from "./subscriber";
import product from "./product";
import notification from "./notification";
import history from "./history";
import statistic from "./statistic";
import user from "./user";
import admin from "./admin";

export default combineReducers({
    auth,
    message,
    fridge,
    subscriber,
    product,
    notification,
    history,
    statistic,
    user,
    admin
});
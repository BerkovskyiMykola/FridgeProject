import EventBus from "../common/EventBus";
import { SET_MESSAGE } from "../constants/message";
import { EDIT_USER_ERROR, EDIT_USER_SUCCESS, GET_USER_INFO_ERROR, GET_USER_INFO_SUCCESS } from "../constants/user";
import userService from "../services/user.service";

export const getUser = () => (dispatch) => {
    return userService.getUser().then(
        (responce) => {
            dispatch({
                type: GET_USER_INFO_SUCCESS,
                payload: responce.data
            });

            return Promise.resolve();
        },
        (error) => {
            if (error.response && error.response.status === 401) {
                EventBus.dispatch("logout");
            }

            dispatch({
                type: GET_USER_INFO_ERROR,
            });

            return Promise.reject();
        }
    )
}

export const editUser = (userId, lastname, firstname) => (dispatch) => {
    return userService.editUser(userId, lastname, firstname).then(
        (responce) => {
            dispatch({
                type: EDIT_USER_SUCCESS
            });

            return Promise.resolve();
        },
        (error) => {
            if (error.response && error.response.status === 401) {
                EventBus.dispatch("logout");
            }

            dispatch({
                type: EDIT_USER_ERROR
            });

            const message = error.response.data.title || error.response.data;

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    )
}
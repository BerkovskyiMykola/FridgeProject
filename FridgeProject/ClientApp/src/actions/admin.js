import EventBus from "../common/EventBus";
import { CREATE_USER_ERROR, CREATE_USER_SUCCESS, DELETE_USER_ERROR, DELETE_USER_SUCCESS, EDIT_USER_ERROR, GET_USERS } from "../constants/admin";
import { SET_MESSAGE } from "../constants/message";
import { EDIT_USER_SUCCESS } from "../constants/user";
import adminService from "../services/admin.service";

export const getUsers = () => (dispatch) => {
    return adminService.getUsers().then(
        (responce) => {
            dispatch({
                type: GET_USERS,
                payload: { users: responce.data }
            });

            return Promise.resolve();
        },
        (error) => {
            if (error.response && error.response.status === 401) {
                EventBus.dispatch("logout");
            }

            return Promise.reject();
        }
    )
}

export const editUser = (userId, lastname, firstname, role) => (dispatch) => {
    return adminService.editUser(userId, lastname, firstname, role).then(
        (responce) => {
            dispatch({
                type: EDIT_USER_SUCCESS,
                payload: { userId, lastname, firstname, role }
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

export const createUser = (lastname, firstname, email, password, role) => (dispatch) => {
    return adminService.createUser(lastname, firstname, email, password, role).then(
        (responce) => {
            dispatch({
                type: CREATE_USER_SUCCESS,
                payload: { user: responce.data }
            });

            return Promise.resolve();
        },
        (error) => {
            if (error.response && error.response.status === 401) {
                EventBus.dispatch("logout");
            }

            dispatch({
                type: CREATE_USER_ERROR
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

export const deleteUser = (id) => (dispatch) => {
    return adminService.deleteUser(id).then(
        (responce) => {
            dispatch({
                type: DELETE_USER_SUCCESS,
                payload: { userId: id }
            });

            return Promise.resolve();
        },
        (error) => {
            if (error.response && error.response.status === 401) {
                EventBus.dispatch("logout");
            }

            dispatch({
                type: DELETE_USER_ERROR
            });

            return Promise.reject();
        }
    )
}
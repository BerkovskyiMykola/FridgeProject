import { REGISTER_SUCCESS, REGISTER_FAIL } from "../constants/register";
import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from "../constants/login";
import { SET_MESSAGE } from "../constants/message";

import AuthService from "../services/auth.service";

export const register = (lastname, firstname, email, password, role) => (dispatch) => {
    return AuthService.register(lastname, firstname, email, password, role).then(
        (response) => {
            dispatch({
                type: REGISTER_SUCCESS,
            });

            return Promise.resolve();
        },
        (error) => {
            const message = 
                (error.response &&
                    error.response.data && 
                    error.response.data.title) || error.response.data || error.response.data.title;

            dispatch({
                type: REGISTER_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};

export const login = (login, password) => (dispatch) => {
    return AuthService.login(login, password).then(
        (data) => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: { user: data },
            });

            dispatch({
                type: SET_MESSAGE,
                payload: "SUCCESSFUL",
            });

            return Promise.resolve();
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.title) || error.response.data || error.response.data.title;

            dispatch({
                type: LOGIN_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};

export const logout = () => (dispatch) => {
    AuthService.logout();

    dispatch({
        type: LOGOUT,
    });
};
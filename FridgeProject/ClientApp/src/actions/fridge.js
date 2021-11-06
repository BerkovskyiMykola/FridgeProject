import EventBus from "../common/EventBus";
import { CREATE_FRIDGE_ERROR, CREATE_FRIDGE_SUCCESS, DELETE_FRIDGE_ERROR, DELETE_FRIDGE_SUCCESS, EDIT_FRIDGE_ERROR, EDIT_FRIDGE_SUCCESS, GET_FRIDGE_ERROR, GET_FRIDGE_SUCCESS, GET_OWN_FRIDGES, GET_SHARED_FRIDGES } from "../constants/fridge";
import { SET_MESSAGE } from "../constants/message";
import fridgeService from "../services/fridge.service";

export const getOwnFridges = () => (dispatch) => {
    return fridgeService.getOwnFridges().then(
        (responce) => {
            dispatch({
                type: GET_OWN_FRIDGES,
                payload: { ownFridges: responce.data }
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

export const getSharedFridges = () => (dispatch) => {
    return fridgeService.getSharedFridges().then(
        (responce) => {
            dispatch({
                type: GET_SHARED_FRIDGES,
                payload: { sharedFridges: responce.data }
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

export const editFridge = (fridgeId, fridgeName) => (dispatch) => {
    return fridgeService.editFridge(fridgeId, fridgeName).then(
        (responce) => {
            dispatch({
                type: EDIT_FRIDGE_SUCCESS,
                payload: { fridgeId, fridgeName }
            });

            return Promise.resolve();
        },
        (error) => {
            if (error.response && error.response.status === 401) {
                EventBus.dispatch("logout");
            }

            dispatch({
                type: EDIT_FRIDGE_ERROR
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

export const createFridge = (fridgeName, userId) => (dispatch) => {
    return fridgeService.createFridge(fridgeName, userId).then(
        (responce) => {
            dispatch({
                type: CREATE_FRIDGE_SUCCESS,
                payload: { fridge: responce.data }
            });

            return Promise.resolve();
        },
        (error) => {
            if (error.response && error.response.status === 401) {
                EventBus.dispatch("logout");
            }

            dispatch({
                type: CREATE_FRIDGE_ERROR
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

export const deleteFridge = (id) => (dispatch) => {
    return fridgeService.deleteFridge(id).then(
        (responce) => {
            dispatch({
                type: DELETE_FRIDGE_SUCCESS,
                payload: { fridgeId: id }
            });

            return Promise.resolve();
        },
        (error) => {
            if (error.response && error.response.status === 401) {
                EventBus.dispatch("logout");
            }

            dispatch({
                type: DELETE_FRIDGE_ERROR
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
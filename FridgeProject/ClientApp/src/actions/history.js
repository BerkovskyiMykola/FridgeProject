import EventBus from "../common/EventBus";
import { DELETE_HISTORY_ERROR, DELETE_HISTORY_SUCCESS, GET_HISTORIES } from "../constants/history";
import historyService from "../services/history.service";

export const getHistories = () => (dispatch) => {
    return historyService.getHistories().then(
        (responce) => {
            dispatch({
                type: GET_HISTORIES,
                payload: { histories: responce.data }
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

export const deleteHistory = (id) => (dispatch) => {
    return historyService.deleteHistory(id).then(
        (responce) => {
            dispatch({
                type: DELETE_HISTORY_SUCCESS,
                payload: { historyId: id }
            });

            return Promise.resolve();
        },
        (error) => {
            if (error.response && error.response.status === 401) {
                EventBus.dispatch("logout");
            }

            dispatch({
                type: DELETE_HISTORY_ERROR
            });

            return Promise.reject();
        }
    )
}
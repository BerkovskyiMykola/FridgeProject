import EventBus from "../common/EventBus";
import { SET_MESSAGE } from "../constants/message";
import { CREATE_SUBSCRIBER_ERROR, CREATE_SUBSCRIBER_SUCCESS, DELETE_SUBSCRIBER_ERROR, DELETE_SUBSCRIBER_SUCCESS, GET_SUBSCRIBERS } from "../constants/subscriber";
import subscriberService from "../services/subscriber.service";

export const getSubscribers = (fridgeId, fridgeName) => (dispatch) => {
    return subscriberService.getSubscribers(fridgeId, fridgeName).then(
        (responce) => {
            dispatch({
                type: GET_SUBSCRIBERS,
                payload: { subscribers: responce.data }
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

export const createSubscriber = (email, fridgeId, fridgeName) => (dispatch) => {
    return subscriberService.createSubscriber(email, fridgeId, fridgeName).then(
        (responce) => {
            dispatch({
                type: CREATE_SUBSCRIBER_SUCCESS,
                payload: { subscriber: responce.data }
            });

            return Promise.resolve();
        },
        (error) => {
            if (error.response && error.response.status === 401) {
                EventBus.dispatch("logout");
            }

            dispatch({
                type: CREATE_SUBSCRIBER_ERROR
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

export const deleteSubscriber = (id, fridgeName) => (dispatch) => {
    return subscriberService.createSubscriber(id, fridgeName).then(
        (responce) => {
            dispatch({
                type: DELETE_SUBSCRIBER_SUCCESS,
                payload: { subscriberId: id }
            });

            return Promise.resolve();
        },
        (error) => {
            if (error.response && error.response.status === 401) {
                EventBus.dispatch("logout");
            }

            dispatch({
                type: DELETE_SUBSCRIBER_ERROR
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
import { CREATE_SUBSCRIBER_SUCCESS, DELETE_SUBSCRIBER_SUCCESS, GET_SUBSCRIBERS_ERROR, GET_SUBSCRIBERS_SUCCESS } from "../constants/subscriber";

const initialState = {
    subscribers: []
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_SUBSCRIBERS_SUCCESS:
            return {
                subscribers: payload.subscribers
            }
        case GET_SUBSCRIBERS_ERROR:
            return {
                subscribers: []
            }
        case CREATE_SUBSCRIBER_SUCCESS:
            return {
                subscribers: [...state.subscribers, payload.subscriber]
            }
        case DELETE_SUBSCRIBER_SUCCESS:
            return {
                subscribers: state.subscribers.filter(x => x.subscriberId !== payload.subscriberId)
            }
        default:
            return state;
    }
}
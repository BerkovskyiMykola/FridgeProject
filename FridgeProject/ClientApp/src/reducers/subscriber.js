import { CREATE_SUBSCRIBER_SUCCESS, DELETE_SUBSCRIBER_SUCCESS, GET_SUBSCRIBERS_ERROR, GET_SUBSCRIBERS_SUCCESS } from "../constants/subscriber";

const initialState = {
    fridgeName: "",
    subscribers: []
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_SUBSCRIBERS_SUCCESS:
            return {
                fridgeName: payload.fridgeName,
                subscribers: payload.subscribers
            }
        case GET_SUBSCRIBERS_ERROR:
            return {
                fridgeName: "",
                subscribers: []
            }
        case CREATE_SUBSCRIBER_SUCCESS:
            return {
                ...state,
                subscribers: [...state.subscribers, payload.subscriber]
            }
        case DELETE_SUBSCRIBER_SUCCESS:
            return {
                ...state,
                subscribers: state.subscribers.filter(x => x.subscriberId !== payload.subscriberId)
            }
        default:
            return state;
    }
}
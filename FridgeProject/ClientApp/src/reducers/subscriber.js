import { CREATE_SUBSCRIBER_SUCCESS, DELETE_SUBSCRIBER_SUCCESS, GET_SUBSCRIBERS } from "../constants/subscriber";

const initialState = {
    subscribers: []
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_SUBSCRIBERS:
            return {
                ...state,
                subscribers: payload.subscribers
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
import { DELETE_HISTORY_SUCCESS, GET_HISTORIES } from "../constants/history";

const initialState = {
    histories: []
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_HISTORIES:
            return {
                histories: payload.histories
            }
        case DELETE_HISTORY_SUCCESS:
            return {
                histories: state.histories.filter(x => x.historyId !== payload.historyId)
            }
        default:
            return state;
    }
}
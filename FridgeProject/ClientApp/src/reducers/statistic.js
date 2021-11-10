import { GET_STATISTIC_SUCCESS } from "../constants/statistic";

const initialState = {
    statistic: []
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_STATISTIC_SUCCESS:
            return {
                statistic: payload
            }
        default:
            return state;
    }
}
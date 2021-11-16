import { GET_USER_INFO_SUCCESS } from "../constants/user";

const initialState = {
    lastname: "",
    firstname: ""
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_USER_INFO_SUCCESS:
            return {
                ...state,
                lastname: payload.lastname,
                firstname: payload.firstname
            }
        default:
            return state;
    }
}
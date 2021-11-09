import { GET_NOTIFICATIONS_SUCCESS} from "../constants/notification";

const initialState = {notifications : []};
const notification = (state = initialState, action) => {
    switch(action.type){
        case GET_NOTIFICATIONS_SUCCESS:
            return { notifications: action.notifications };
        default: 
            return state;
        
    }
};

export default notification;
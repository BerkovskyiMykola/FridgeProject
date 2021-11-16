import NotificationService from "../services/notification.service";
import { GET_NOTIFICATIONS_SUCCESS, GET_NOTIFICATIONS_ERROR  } from "../constants/notification";
import EventBus from "../common/EventBus";

export function allNotifications(){
    return (dispatch) =>{
        return NotificationService.allNotifications().then((data) =>{
            dispatch({
                type: GET_NOTIFICATIONS_SUCCESS,
                notifications: data
            });
            return Promise.resolve();
        },
        (error) => {
            if (error.response && error.response.status === 401) {
                EventBus.dispatch("logout");
            }
            dispatch({
                type: GET_NOTIFICATIONS_ERROR
            });
            return Promise.reject();
        });
    }
};








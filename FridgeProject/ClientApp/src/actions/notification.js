import NotificationService from "../services/notification.service";
import { GET_NOTIFICATIONS_SUCCESS, GET_NOTIFICATIONS_ERROR, POST_NOTIFICATION_SUCCESS, POST_NOTIFICATION_ERROR  } from "../constants/notification";
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

export function sendNotification(text, date){
    return (dispatch) =>{
        return NotificationService.sendNotification(text, date).then(
            (response) => {
                dispatch({
                    type: POST_NOTIFICATION_SUCCESS,
                });
                return Promise.resolve();
            },
            (error) => {
                if (error.response && error.response.status === 401) {
                    EventBus.dispatch("logout");
                }
                dispatch({
                    type: POST_NOTIFICATION_ERROR
                });
                return Promise.reject();
        }   );
    }
    
}








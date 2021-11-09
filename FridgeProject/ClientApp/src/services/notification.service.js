import axios from 'axios';
import authHeader from './auth-header';
import { CURRENT_DOMAIN } from "../utils/domain";

const API_URL = CURRENT_DOMAIN + "/api/Notifications/";

class NotificationService {
    allNotifications() {
        return axios.get(API_URL + "all",
            {
                headers: authHeader()
            }).then(response => { return response.data });
    }

    sendNotification(text, date) {
        return axios.post(API_URL + "send", { text, date },
            {
                headers: authHeader()
            });
    }
}
export default new NotificationService();
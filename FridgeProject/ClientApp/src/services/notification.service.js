import axios from 'axios';
import authHeader from './auth-header';
import { CURRENT_DOMAIN } from "../utils/domain";

const API_URL = CURRENT_DOMAIN + "/Notifications/";

class NotificationService {
    allNotifications() {
        return axios.get(API_URL + "all",
            {
                headers: authHeader()
            }).then(response => { return response.data });
    }
}
export default new NotificationService();
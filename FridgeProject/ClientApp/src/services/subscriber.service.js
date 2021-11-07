import axios from "axios";
import { CURRENT_DOMAIN } from "../utils/domain";
import authHeader from "./auth-header";

const API_URL = CURRENT_DOMAIN + "/Subscribers/";

class SubscriberService {
    getSubscribers(fridgeId) {
        return axios.get(API_URL + "all/" + fridgeId, { headers: authHeader() });
    }

    createSubscriber(email, fridgeId) {
        return axios.post(API_URL + "add", { email, fridgeId }, { headers: authHeader() });
    }

    deleteSubscriber(id) {
        return axios.delete(API_URL + "delete/" + id, { headers: authHeader() });
    }
}

export default new SubscriberService();
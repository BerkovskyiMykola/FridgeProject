import axios from "axios";
import { CURRENT_DOMAIN } from "../utils/domain";
import authHeader from "./auth-header";

const API_URL = CURRENT_DOMAIN + "/Subscribers/";

class SubscriberService {
    getSubscribers(fridgeId, fridgeName) {
        return axios.get(API_URL + "all/" + fridgeId + "/" + fridgeName, { headers: authHeader() });
    }

    createSubscriber(email, fridgeId, fridgeName) {
        return axios.post(API_URL + "add/" + fridgeName, { email, fridgeId }, { headers: authHeader() });
    }

    deleteSubscriber(id, fridgeName) {
        return axios.delete(API_URL + "delete/" + id + "/" + fridgeName, { headers: authHeader() });
    }
}

export default new SubscriberService();
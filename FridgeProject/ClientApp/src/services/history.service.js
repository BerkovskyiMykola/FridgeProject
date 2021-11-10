import axios from "axios";
import { CURRENT_DOMAIN } from "../utils/domain";
import authHeader from "./auth-header";

const API_URL = CURRENT_DOMAIN + "/Histories/";

class HistoryService {
    getHistories() {
        return axios.get(API_URL + "all", { headers: authHeader() });
    }

    deleteHistory(id) {
        return axios.delete(API_URL + "delete/" + id, { headers: authHeader() });
    }
}

export default new HistoryService();
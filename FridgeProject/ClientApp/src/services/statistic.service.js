import axios from "axios";
import { CURRENT_DOMAIN } from "../utils/domain";
import authHeader from "./auth-header";

const API_URL = CURRENT_DOMAIN + "/Statistics/";

class StatisticService {
    getProductStatistic(startDate, endDate) {
        return axios.post(API_URL + "products", { startDate, endDate }, { headers: authHeader() });
    }
}

export default new StatisticService();
import axios from "axios";
import { CURRENT_DOMAIN } from "../utils/domain";
import authHeader from "./auth-header";

const API_URL = CURRENT_DOMAIN + "/Fridges/";

class FridgeService {
    getOwnFridges() {
        return axios.get(API_URL + "own/all", { headers: authHeader() });
    }

    getSharedFridges() {
        return axios.get(API_URL + "shared/all", { headers: authHeader() });
    }

    editFridge(fridgeId, fridgeName) {
        return axios.put(API_URL + "edit", { fridgeId, fridgeName }, { headers: authHeader() });
    }

    createFridge(fridgeName, userId) {
        return axios.post(API_URL + "create", { fridgeName, userId }, { headers: authHeader() });
    }

    deleteFridge(id) {
        return axios.delete(API_URL + "delete/" + id, { headers: authHeader() });
    }
}

export default new FridgeService();
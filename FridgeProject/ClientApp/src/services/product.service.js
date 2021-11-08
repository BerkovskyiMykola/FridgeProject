import axios from "axios";
import { CURRENT_DOMAIN } from "../utils/domain";
import authHeader from "./auth-header";

const API_URL = CURRENT_DOMAIN + "/Products/";

class ProductService {
    getAddedProducts(fridgeId) {
        return axios.get(API_URL + "all/true/" + fridgeId, { headers: authHeader() });
    }

    createProduct(productName, expirationDate, description, amount) {
        return axios.post(API_URL + "create/true", { productName, expirationDate, description, amount }, { headers: authHeader() });
    }
    deleteProduct(id) {
        return axios.delete(API_URL + "delete/" + id, { headers: authHeader() });
    }
}

export default new ProductService();
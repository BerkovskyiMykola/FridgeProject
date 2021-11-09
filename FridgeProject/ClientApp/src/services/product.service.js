import axios from "axios";
import { CURRENT_DOMAIN } from "../utils/domain";
import authHeader from "./auth-header";

const API_URL = CURRENT_DOMAIN + "/Products/";

class ProductService {
    getAddedProducts(fridgeId) {
        return axios.get(API_URL + "all/" + fridgeId, { headers: authHeader() });
    }

    createProduct(fridgeId, productName, expirationDate, description, amount) {
        return axios.post(API_URL + "create/true", { fridgeId, productName, expirationDate, description, amount }, { headers: authHeader() });
    }

    deleteProduct(id) {
        return axios.delete(API_URL + "delete/" + id, { headers: authHeader() });
    }

    throwOutProduct(id, amount) {
        return axios.put(API_URL + "throwOut/" + id + "/" + amount, { headers: authHeader() });
    }

    editProduct(productId, productName, expirationDate, description, amount) {
        return axios.post(API_URL + "edit", { productId, productName, expirationDate, description, amount }, { headers: authHeader() });
    }
}

export default new ProductService();
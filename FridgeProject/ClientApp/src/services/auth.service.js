﻿import axios from "axios";
import { CURRENT_DOMAIN } from "../utils/domain";

const API_URL = CURRENT_DOMAIN + "/Users/";

class AuthService {
    login(login, password) {
        return axios
            .post(API_URL + "login", { login, password })
            .then((response) => {
                if (response.data.token) {
                    sessionStorage.setItem("user", JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    logout() {
        sessionStorage.removeItem("user");
    }

    register(lastname, firstname, email, password, role) {
        return axios.post(API_URL + "register", {
            lastname,
            firstname,
            email,
            password,
            role
        });
    }
}

export default new AuthService();
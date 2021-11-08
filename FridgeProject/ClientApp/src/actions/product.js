import EventBus from "../common/EventBus";
import { SET_MESSAGE } from "../constants/message";
import { CREATE_PRODUCT_ERROR, CREATE_PRODUCT_SUCCESS, DELETE_PRODUCT_ERROR, DELETE_PRODUCT_SUCCESS, EDIT_PRODUCT_ERROR, EDIT_PRODUCT_SUCCESS, GET_PRODUCTS_ERROR, GET_PRODUCTS_SUCCESS, THROW_OUT_PRODUCTS_ERROR, THROW_OUT_PRODUCTS_SUCCESS } from "../constants/product";
import productService from "../services/product.service";

export const getAddedProducts = (fridgeId) => (dispatch) => {
    return productService.getAddedProducts(fridgeId).then(
        (responce) => {
            dispatch({
                type: GET_PRODUCTS_SUCCESS,
                payload: responce.data
            });

            return Promise.resolve();
        },
        (error) => {
            if (error.response && error.response.status === 401) {
                EventBus.dispatch("logout");
            }
            dispatch({
                type: GET_PRODUCTS_ERROR,
            });

            return Promise.reject();
        }
    )
}

export const createProduct = (productName, expirationDate, description, amount) => (dispatch) => {
    return productService.createProduct(productName, expirationDate, description, amount).then(
        (responce) => {
            dispatch({
                type: CREATE_PRODUCT_SUCCESS,
                payload: { subscriber: responce.data }
            });

            return Promise.resolve();
        },
        (error) => {
            if (error.response && error.response.status === 401) {
                EventBus.dispatch("logout");
            }

            dispatch({
                type: CREATE_PRODUCT_ERROR
            });

            const message = error.response.data.title || error.response.data;

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    )
}

export const deleteProduct = (id) => (dispatch) => {
    return productService.deleteProduct(id).then(
        (responce) => {
            dispatch({
                type: DELETE_PRODUCT_SUCCESS,
                payload: { productId: id }
            });

            return Promise.resolve();
        },
        (error) => {
            if (error.response && error.response.status === 401) {
                EventBus.dispatch("logout");
            }

            dispatch({
                type: DELETE_PRODUCT_ERROR
            });

            return Promise.reject();
        }
    )
}

export const throwOutProduct = (id, amount) => (dispatch) => {
    return productService.throwOutProduct(id, amount).then(
        (responce) => {
            dispatch({
                type: THROW_OUT_PRODUCTS_SUCCESS,
                payload: { productId: id, amount: amount }
            });

            return Promise.resolve();
        },
        (error) => {
            if (error.response && error.response.status === 401) {
                EventBus.dispatch("logout");
            }

            dispatch({
                type: THROW_OUT_PRODUCTS_ERROR
            });

            const message = error.response.data.title || error.response.data;

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    )
}

export const editProduct = (productName, expirationDate, description, amount) => (dispatch) => {
    return productService.editProduct(productName, expirationDate, description, amount).then(
        (responce) => {
            dispatch({
                type: EDIT_PRODUCT_SUCCESS,
                payload: { productName, expirationDate, description, amount }
            });

            return Promise.resolve();
        },
        (error) => {
            if (error.response && error.response.status === 401) {
                EventBus.dispatch("logout");
            }

            dispatch({
                type: EDIT_PRODUCT_ERROR
            });

            const message = error.response.data.title || error.response.data;

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    )
}
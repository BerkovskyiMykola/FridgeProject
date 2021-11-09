import { CREATE_PRODUCT_SUCCESS, DELETE_PRODUCT_SUCCESS, EDIT_PRODUCT_SUCCESS, GET_PRODUCTS_ERROR, GET_PRODUCTS_SUCCESS, THROW_OUT_PRODUCTS_SUCCESS } from "../constants/product";

const initialState = {
    fridgeName: "",
    products: []
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_PRODUCTS_SUCCESS:
            return {
                fridgeName: payload.fridgeName,
                products: payload.products
            }
        case GET_PRODUCTS_ERROR:
            return {
                fridgeName: "",
                products: []
            }
        case CREATE_PRODUCT_SUCCESS:
            return {
                ...state,
                products: [...state.products, payload.product]
            }
        case DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                products: state.products.filter(x => x.productId !== payload.productId)
            }
        case EDIT_PRODUCT_SUCCESS:
            return {
                ...state,
                products: state.products.map(product => {
                    if (product.productId === payload.productId)
                        return {
                            ...product, productName: payload.productName,
                            expirationDate: payload.expirationDate, description: payload.description,
                            amount: payload.amount
                        }
                    return product;
                })
            }
        case THROW_OUT_PRODUCTS_SUCCESS:
            return {
                ...state,
                products: state.products.map(product => {
                    if (product.productId === payload.productId)
                        return {
                            ...product, amount: product.amount - payload.amount
                        }
                    return product;
                })
            }
        default:
            return state;
    }
}
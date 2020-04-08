import * as actionTypes from '../actions/actionTypes';
import { objectHelper } from '../../shared/utility';

const initialState = {
    orders: [],
    loader: false,
    error: null,
    purchased: false,
    signToOrder: false,
};

const purchaseInitializer = (state) => {
    const newState = {
        purchased: false
    }
    return objectHelper(state, newState)
}

const purchaseSuccess = (state, payload) => {
    const orders = {
        ...payload.order,
        id: payload.orderId
    }
    const newState = {
        loader: false,
        purchased: true,
        orders: state.orders.concat(orders)
    }
    return objectHelper(state, newState);
}

const purchaseFail = (state, payload) => {
    const newState = {
        error: payload.error
    }
    return objectHelper(state, newState)
}

const purchaseStart = (state, payload) => {
    const newState = {
        loader: payload.loading
    }
    return objectHelper(state, newState)
}
const fetchOrdersStart = (state) => {
    const newState = {
        loader: true
    }
    return objectHelper(state, newState)
}
const fetchOrdersSuccess = (state, payload) => {
    const newState = {
        loader: false,
        orders: payload.orders
    }
    return objectHelper(state, newState)
}
const fetchOrdersFailed = (state, payload) => {
    const newState = {
        loader: false,
        error: payload.error
    }
    return objectHelper(state, newState);
}

const signToOrder = (state) => {
    const newState = {
        signToOrder: true,
    }
    return objectHelper(state, newState)
}

const resetSignToOrder = (state) => {
    const newState = {
        signToOrder: false,
    }
    return objectHelper(state, newState)
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case (actionTypes.PURCHASE_INITIALIZER) : return purchaseInitializer(state);
        case (actionTypes.PURCHASE_SUCCESS) : return purchaseSuccess(state, payload)
        case (actionTypes.PURCHASE_FAIL) : return purchaseFail(state, payload)
        case (actionTypes.PURCHASE_START) : return purchaseStart(state, payload)
        case (actionTypes.FETCH_ORDERS_START) : return fetchOrdersStart(state)
        case (actionTypes.FETCH_ORDERS_SUCCESS) : return fetchOrdersSuccess(state, payload)
        case (actionTypes.FETCH_ORDERS_FAILED) : return fetchOrdersFailed(state, payload)
        case (actionTypes.SIGN_TO_ORDER) : return signToOrder(state);
        case (actionTypes.RESET_SIGN_TO_ORDER) : return resetSignToOrder(state);
        default : return state
    }
}

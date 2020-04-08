import * as actionTypes from "./actionTypes";
import axios from '../../axios';

export const purchaseSuccess = (id, order) => {
    return {
        type: actionTypes.PURCHASE_SUCCESS,
        payload: {
            order: order,
            orderId: id,
        }
    }
}

export const puchaseFail = (error) => {
    return {
        type: actionTypes.PURCHASE_FAIL,
        payload: {
            error: error
        }
    }
}

export const purchaseStart = () => {
    return {
        type: actionTypes.PURCHASE_START,
        payload: {
            loading: true
        }
    }
}

export const fetchPurchase = (orders, token) => {

    return dispatch => {
        dispatch(purchaseStart());
        setTimeout(() => {
            axios.post('/orders.json?auth=' + token, orders)
                .then(res => {
                    dispatch(purchaseSuccess(res.data.name,  orders))
                }).catch(err => {
                    dispatch(puchaseFail(err))
                })
        }, 4000)
        
    }
};

export const purchaseInitializer = () => {
    return {
        type: actionTypes.PURCHASE_INITIALIZER,
    }
}

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START,
    }
}

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        payload: {
            orders: orders
        }
    }
}

export const fetchOrdersFailed = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAILED,
        payload: {
            error: error
        }
    }
}

export const signToOrder = () => {
    return{
        type: actionTypes.SIGN_TO_ORDER,
    }
}

export const resetSignToOrder = () => {
    return {
        type: actionTypes.RESET_SIGN_TO_ORDER,
    }
}

export const fetchOrdersFromServer = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrdersStart())
        const queryParameters = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`
        axios.get('/orders.json' + queryParameters)
            .then(res => {
                const orders = [];
                for (const key in res.data) {
                    orders.push({
                        ...res.data[key],
                        id: key,
                    })
                }
                return dispatch(fetchOrdersSuccess(orders))
            })
        .catch(err => {
            return dispatch(fetchOrdersFailed(err));
        })
    }
}




import * as actionTypes from '../actions/actionTypes';
import { objectHelper } from '../../shared/utility';

const initialState = {
    token: null,
    userId: null,
    error: null,
    registerError: null,
    loader: false,

}

const authStart = (state) => {
    const newState = {
        loader: true,
        error: null
    }
    return objectHelper(state, newState)
}

const authSuccess = (state, payload) => {
    const newState = {
        token: payload.token,
        userId: payload.userId,
        error: null,
        loader: false
    }
    return objectHelper(state, newState)
}

const authFailed = (state, payload) => {
    const newState = {
        error: payload.error,
        loader: false
    }
    return objectHelper(state, newState)
}

const authLogout = (state) => {
    const newState = {
        token: null,
        userId: null,
    }
    return objectHelper(state, newState)
}

const registerFailed = (state, payload) => {
    const newState = {
        registerError: payload.error,
        loader: false
    }

    return objectHelper(state, newState)
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.AUTH_START: return authStart(state)
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, payload)
        case actionTypes.AUTH_FAILED: return authFailed(state, payload)
        case actionTypes.AUTH_LOGOUT: return authLogout(state)
        case actionTypes.REGISTER_FAILED: return registerFailed(state, payload)
        default : return state
    }
}

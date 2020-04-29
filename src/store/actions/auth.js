import * as actionTypes from './actionTypes.js';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START,
    }
}

export const authSuccess = (token, localId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        payload: {
            token: token,
            userId: localId,
        }
    }
}

export const authFailed = (error) => {
    return {
        type: actionTypes.AUTH_FAILED,
        payload: {
            error: error
        }
    }
}

export const registerFailed = (error) => {
    return {
        type: actionTypes.REGISTER_FAILED,
        payload: {
            error: error
        }
    }
}

export const authLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('expirationTime')
    return {
        type: actionTypes.AUTH_LOGOUT,
    }
}

export const authTokenTimeout = (estimatedTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(authLogout())
        }, estimatedTime);
    }
}

export const auth = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        const reqData = {
            email: email,
            password: password,
            returnSecureToken: true,
        };
    
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBkRblKsCpVMvDeFAumLp3st7nZpv_VCfI';

        axios.post(url, reqData)
            .then(res => {
                localStorage.setItem('token', res.data.idToken);
                const expirationTime = new Date(new Date().getTime() + (res.data.expiresIn * 1000))
                localStorage.setItem('expirationTime', expirationTime);
                localStorage.setItem('userId', res.data.localId)
                dispatch(authSuccess(res.data.idToken, res.data.localId));
                dispatch(authTokenTimeout(res.data.expiresIn * 1000));
            })
            .catch(err => {
                dispatch(authFailed(err.response.data.error)); 
            })

    }
}

export const registerUser = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        const reqData = {
            email: email,
            password: password,
            returnSecureToken: true,
        };
        const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBkRblKsCpVMvDeFAumLp3st7nZpv_VCfI';

        axios.post(url, reqData)
            .then(res => {
                localStorage.setItem('token', res.data.idToken);
                const expirationTime = new Date(new Date().getTime() + (res.data.expiresIn * 1000))
                localStorage.setItem('expirationTime', expirationTime);
                localStorage.setItem('userId', res.data.localId)
                dispatch(authSuccess(res.data.idToken, res.data.localId));
                dispatch(authTokenTimeout(res.data.expiresIn * 1000));
            })
            .catch(err => {
                dispatch(registerFailed(err.response.data.error)); 
            })

    }
}

export const autoAuth = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if(!token){
            dispatch(authLogout())
        }else{
            const expirationTime = new Date(localStorage.getItem('expirationTime'));
            if(expirationTime > new Date()){
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                const expirationTimeInMilis = expirationTime.getTime() - new Date().getTime();
                dispatch(authTokenTimeout(expirationTimeInMilis));
            }else{
                dispatch(authLogout())
            }
        }
    }
}

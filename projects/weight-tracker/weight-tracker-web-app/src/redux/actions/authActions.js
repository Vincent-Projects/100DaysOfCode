import * as actionTypes from '../actionTypes';


export const login = (token, expireIn) => {
    return {
        type: actionTypes.LOGIN,
        payload: {
            token: token,
            expireIn: expireIn
        }
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expireDate');

    return {
        type: actionTypes.LOGOUT
    }
}

export const checkAuthState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (token) {
            const expireDate = new Date(localStorage.getItem('expireDate'));
            if (expireDate > new Date()) {
                const expireIn = (expireDate.getTime() - new Date().getTime()) / 1000;
                dispatch({
                    type: actionTypes.LOGIN,
                    payload: {
                        token: token,
                        expireIn: expireIn
                    }
                })
            } else {
                dispatch(logout());
            }
        } else {
            dispatch(logout());
        }
    }
}
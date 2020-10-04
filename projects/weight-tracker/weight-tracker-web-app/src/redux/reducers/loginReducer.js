import * as actionsTypes from '../actionTypes';

const initialState = {
    isLoggedIn: false,
    token: "",
    expireIn: ""
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionsTypes.LOGIN:
            return {
                ...state,
                isLoggedIn: true,
                token: action.payload.token,
                expireIn: action.payload.expireIn
            };
        case actionsTypes.LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                token: "",
                expireIn: ""
            };
        default:
            return state;
    }
}

export default reducer;
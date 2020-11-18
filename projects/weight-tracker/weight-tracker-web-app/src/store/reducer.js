const initialState = {
    isAuth: false,
    token: null,
    tokenExpireDate: null
}

const authActions = {
    LOGIN: "LOGIN",
    LOGOUT: "LOGOUT"
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case authActions.LOGIN:
            return {
                ...state,
                isAuth: true,
                token: action.payload.token,
                tokenExpireDate: action.payload.tokenExpireDate
            };
        case authActions.LOGOUT:
            return {
                ...state,
                isAuth: false,
                token: null,
                tokenExpireDate: null
            };
        default:
            return state;
    }
}

export default reducer;
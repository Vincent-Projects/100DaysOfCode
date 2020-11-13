import React from "react";

import { Redirect } from "react-router-dom";

import {
    TOKEN_NAME,
    TOKEN_EXPIRE_NAME
} from "../constants";

const isLogged = WrappedComponent => {
    const token = localStorage.getItem(TOKEN_NAME);
    const tokenExpire = localStorage.getItem(TOKEN_EXPIRE_NAME);
    let isLogged = false;

    if (token && tokenExpire) {
        const currentDate = new Date(Date.now());
        const expireDate = new Date(tokenExpire);

        if (currentDate < expireDate) {
            isLogged = true;
        }
    }

    if (!isLogged) {
        return props => <Redirect to="/login" />;
    }
    return props => <WrappedComponent token={token} />
};

export default isLogged;
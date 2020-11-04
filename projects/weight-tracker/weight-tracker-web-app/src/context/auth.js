import React from "react";

const authContext = React.createContext({
    isAuth: false,
    login: () => { },
    logout: () => { },
    signup: () => { }
});

export default authContext;
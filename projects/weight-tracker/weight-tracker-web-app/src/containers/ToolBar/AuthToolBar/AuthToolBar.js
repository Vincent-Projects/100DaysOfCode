import React from "react";
import { NavLink } from "react-router-dom";

import classes from "../ToolBar.module.css";

const AuthToolBar = props => {
    return <>
        <li className={classes.LinkItem}>
            <NavLink activeClassName={classes.Active} className={classes.Link} exact to="/login">
                <p>Login</p>
            </NavLink>
        </li>
        <li className={classes.LinkItem}>
            <NavLink activeClassName={classes.Active} className={classes.Link} to="/signup">
                <p>Sign up</p>
            </NavLink>
        </li>
    </>
}

export default AuthToolBar;
import React from "react";
import { NavLink } from "react-router-dom";

import { ReactComponent as HomeLogo } from "../../../assets/icons/home-solid.svg";
import { ReactComponent as WeightManagerLogo } from "../../../assets/icons/weight-solid.svg";
import { ReactComponent as WorkoutManagerLogo } from "../../../assets/icons/dumbbell-solid.svg";
import { ReactComponent as AccountLogo } from "../../../assets/icons/user-solid.svg";

import classes from "../ToolBar.module.css";

const LoggedToolBar = props => {
    return <>
        <li className={classes.LinkItem}>
            <NavLink activeClassName={classes.Active} className={classes.Link} exact to="/">
                <HomeLogo className={classes.Svg} /><p>Home</p>
            </NavLink>
        </li>
        <li className={classes.LinkItem}>
            <NavLink activeClassName={classes.Active} className={classes.Link} to="/weight-manager">
                <WeightManagerLogo className={classes.Svg} /><p>Weight Manager</p>
            </NavLink>
        </li>
        <li className={classes.LinkItem}>
            <NavLink activeClassName={classes.Active} className={classes.Link} to="/workout-manager"><WorkoutManagerLogo className={classes.Svg} /><p>Workout</p></NavLink>
        </li>
        <li className={classes.LinkItem}>
            <NavLink activeClassName={classes.Active} className={classes.Link} to="/account"><AccountLogo className={classes.Svg} /><p>Account</p></NavLink>
        </li>
    </>
}

export default LoggedToolBar;
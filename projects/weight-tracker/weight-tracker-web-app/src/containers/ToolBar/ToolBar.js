import React from "react";
import classes from "./ToolBar.module.css";
import { Link, NavLink } from "react-router-dom";

import { ReactComponent as HomeLogo } from "../../assets/icons/home-solid.svg";
import { ReactComponent as WeightManagerLogo } from "../../assets/icons/weight-solid.svg";
import { ReactComponent as WorkoutManagerLogo } from "../../assets/icons/dumbbell-solid.svg";
import { ReactComponent as AccountLogo } from "../../assets/icons/user-solid.svg";

const ToolBar = props => {
    return (
        <div className={classes.ToolBar}>
            <nav>
                <ul>
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
                        <Link className={classes.Link} to="/"><WorkoutManagerLogo className={classes.Svg} /><p>Workout</p></Link>
                    </li>
                    <li className={classes.LinkItem}>
                        <Link className={classes.Link} to="/"><AccountLogo className={classes.Svg} /><p>Account</p></Link>
                    </li>
                </ul>
            </nav>
        </div >
    )
}

export default ToolBar;
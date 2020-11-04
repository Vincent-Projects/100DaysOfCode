import React from "react";
import classes from "./ToolBar.module.css";

import AuthContext from "../../context/auth";
import LoggedToolBar from "./LoggedToolBar/LoggedToolBar";
import AuthToolBar from "./AuthToolBar/AuthToolBar.js";

const ToolBar = props => {
    return (
        <AuthContext.Consumer>
            {context => {
                return (
                    <div className={classes.ToolBar}>
                        <div>
                            <h1 className={classes.ToolBarTitle}>WeighTrack</h1>
                        </div>
                        <nav>
                            <ul>
                                {context.isAuth ? <LoggedToolBar /> : <AuthToolBar />}

                            </ul>
                        </nav>
                        <div>
                            <button onClick={context.logout}>logout</button>
                            <p className={classes.Help}>? help</p>
                            <p className={classes.VersionText}>v1.0.0</p>
                        </div>
                    </div >
                );
            }}
        </AuthContext.Consumer>
    )
}

export default ToolBar;
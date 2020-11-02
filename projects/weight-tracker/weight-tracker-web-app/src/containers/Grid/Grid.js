import React from "react";
import classes from "./Grid.module.css";

const Grid = props => {
    return (
        <div className={classes.Grid}>
            {props.children}
        </div>
    );
}

export default Grid;
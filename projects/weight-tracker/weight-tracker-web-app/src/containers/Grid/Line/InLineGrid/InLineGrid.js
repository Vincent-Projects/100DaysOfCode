import React from "react";
import classes from "./InLineGrid.module.css";

const InLineGrid = props => {
    return (
        <div className={classes.InLineGrid}>
            {props.children}
        </div>
    );
}

export default InLineGrid;
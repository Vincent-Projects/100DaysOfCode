import React from "react";

import classes from "./Square.module.css";

const Square = props => {
    let className;

    if (props.rowLevel === "One" || props.rowLevel === "Two" || props.rowLevel === "Three") {
        className = props.rowLevel;
    }

    return (
        <div className={`${classes.Square} ${classes[className]}`}>
            {props.children}
        </div>
    );
}

export default Square;
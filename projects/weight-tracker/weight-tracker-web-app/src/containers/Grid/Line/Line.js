import React from "react";
import classes from "./Line.module.css";

const Line = props => {
    const line = props.lineLevel;
    let className;

    if (line === "One" || line === "Two" || line === "Three") {
        className = line;
    }

    return (
        <div className={`${classes.Line} ${classes[className]}`}>
            {props.children}
        </div>
    );
}

export default Line;
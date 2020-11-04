import React from "react";
import classes from "./Title.module.css";

const Title = props => {
    return (
        <div className={classes.Title}>
            <h1>{props.title}</h1>
            <p>{props.subTitle}</p>
        </div>
    );
}

export default Title;
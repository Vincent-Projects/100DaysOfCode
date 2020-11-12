import React from "react";

import classes from "./MonthWeightInfo.module.css";

const MonthWeightInfo = props => {
    return (
        <div className={classes.Container}>
            <h2 className={classes.Title}>{props.title}</h2>
            <div className={classes.Content}>
                {props.content}
            </div>
        </div>
    );
};

export default MonthWeightInfo;
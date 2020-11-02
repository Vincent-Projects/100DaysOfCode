import React from "react";
import { isToday, isYesterday } from "../../../utils/date/compareDate";

import classes from "./WeightCard.module.css";

const WeightCard = props => {
    let title;
    if (props.title) {
        if (isYesterday(props.title)) {
            title = "Yesterday";
        } else if (isToday(props.title)) {
            title = "Today";
        } else {
            title = new Date(props.title);
            title = `${title.getDate()} / ${`0${title.getMonth() + 1}`.slice(-2)} / ${title.getFullYear()}`;
        }
    }
    return (
        <div className={classes.WeightCard}>
            <h1 className={classes.WeightCardTitle}>{title}</h1>
            <div className={classes.WeightCardBody}>
                <div className={classes.PercentageBarContainer}>
                    <div className={classes.PercentageBar} style={{ height: `${props.percentage}%` }}></div>
                </div>
                <div className={classes.WeightCardContent}>
                    <p className={classes.WeightCardWeight}>{props.weight}kg<span className={`${classes.WeightCardWeightDiff} ${props.isPositive ? classes.Up : classes.Down}`}>{props.loss ? '-' : '+'}{props.weightDiff}kg</span></p>
                </div>
            </div>
            <div className={classes.HelpSection}>
                <p>?</p>
                <div className={classes.HelpSectionNote}>
                    <h1>{props.helpTitle}</h1>
                    <p>{props.helpContent}</p>
                </div>
            </div>
        </div>
    );
}

export default WeightCard;
import React from "react";
import { isToday, isYesterday } from "../../../utils/date/compareDate";

import classes from "./WeightCard.module.css";

const WeightCard = props => {

    let percentageBar = props.percentage
        ? (
            <div className={classes.PercentageBarContainer}>
                <div className={classes.PercentageBar} style={{ height: `${props.percentage <= 100 ? props.percentage : 100}%` }}></div>
            </div>
        ) : null;

    let weightDiff = props.weightDiff ? (
        <span className={`${classes.WeightCardWeightDiff} ${props.isPositive ? classes.Up : classes.Down}`}>
            {props.loss ? '-' : '+'}{props.weightDiff}kg
        </span>
    ) : null;

    /*if (props.weightDiff != null || props.weightDiff != undefined) {
        weight = <p className={classes.WeightCardWeight}>
            {props.weight}kg
                        <span className={`${classes.WeightCardWeightDiff} ${props.isPositive ? classes.Up : classes.Down}`}>
                {props.loss ? '-' : '+'}{props.weightDiff}kg
                        </span>
        </p>;
        percentageBar = <div className={classes.PercentageBarContainer}>
            <div className={classes.PercentageBar} style={{ height: `${props.percentage}%` }}></div>
        </div>;
    } else {
        weight = <p>No Weight Recorded</p>;
        percentageBar = null;
    }*/

    return (
        <div className={classes.WeightCard}>
            <h2 className={classes.WeightCardTitle}>{props.title}</h2>
            <div className={classes.WeightCardBody}>
                {percentageBar}
                <div className={classes.WeightCardContent}>
                    <p className={classes.WeightCardWeight}>
                        {props.weight}kg {weightDiff}
                    </p>
                </div>
            </div>
            <div className={classes.HelpSection}>
                <p>?</p>
                <div className={classes.HelpSectionNote}>
                    <h1>{props.helpTitle}</h1>
                    <p>{props.helpContent}</p>
                </div>
            </div>
        </div >
    );
}

export default WeightCard;
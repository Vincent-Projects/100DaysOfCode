import React from "react";
import classes from "./Alert.module.css";

const Alert = props => {
    let classActive = props.isActive ? classes.Active : null;
    return <div className={`${classes.Container} ${classActive}`}>
        <h2>{props.title}</h2>
        <p>{props.content}</p>
        <div className={classes.BtnContainer}>
            {props.handleValid ? <button className={classes.Btn} onClick={props.handleValid}>{props.validMessage}</button> : null}
            {props.handleCancel ? <button className={classes.Btn} onClick={props.handleCancel}>Cancel</button> : null}
        </div>
    </div>
}

export default Alert;
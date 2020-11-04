import React from "react";
import classes from './Input.module.css';

const Input = props => {
    return (
        <div className={classes.Group}>
            <label className={classes.Label}>{props.title}</label>
            <input className={classes.Input} type={props.type} value={props.value} onChange={props.handleChange} />
        </div>
    )
}

export default Input;
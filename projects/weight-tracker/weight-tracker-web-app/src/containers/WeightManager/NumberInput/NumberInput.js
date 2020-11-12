import React from "react";
import classes from "./NumberInput.module.css";

const NumberInput = props => {
    return (
        <div className={classes.Container}>
            <div className={classes.TitleContainer}>
                <h2 className={classes.Title}>{props.title}</h2>
            </div>
            <div className={classes.InputContainer}>
                <button className={classes.Button} onClick={() => props.handleIncrement(-1)}>-</button>
                <input className={classes.Input} type="Number" value={props.value} onChange={props.handleInputChange} />
                <button className={classes.Button} onClick={() => props.handleIncrement(1)}>+</button>
            </div>
        </div>
    );
}

export default NumberInput;
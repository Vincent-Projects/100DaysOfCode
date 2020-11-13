import React from "react";
import PropTypes from "prop-types";

import classes from './Input.module.css';

const Input = props => {
    const errorMessage = props.error ? (<p className={classes.Error}>{props.error}</p>) : null;
    return (
        <div className={props.row ? classes.RowGroup : classes.Group}>
            <label className={classes.Label}>{props.title}<span className={classes.Info}>{props.info ? `( ${props.info} )` : null}</span></label>
            {errorMessage}
            <input className={classes.Input} type={props.type} value={props.value} onChange={props.handleChange} onBlur={props.handleFocusout} />
        </div>
    )
}

Input.defaultProps = {
    row: false
}

export default Input;
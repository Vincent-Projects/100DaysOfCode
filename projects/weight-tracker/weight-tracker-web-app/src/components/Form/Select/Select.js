import React from "react";

import classes from "./Select.module.css";

const Select = props => {

    const options = props.values.map((value, index) => {
        return <option key={index}>{value}</option>
    });

    return (
        <div className={classes.Container}>
            <p className={classes.Title}>{props.title}</p>
            <select onChange={(event) => props.handleChange(event.target.selectedIndex)}>
                {options}
            </select>
        </div>
    )
}

export default Select;
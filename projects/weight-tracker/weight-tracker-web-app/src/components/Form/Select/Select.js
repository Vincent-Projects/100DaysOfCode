import React from "react";

import classes from "./Select.module.css";

const Select = props => {

    const options = props.values.map((value, index) => {
        return <option key={index} value={value}>{value}</option>
    });

    const selectedIndex = props.values.indexOf(props.selectedValue);

    return (
        <div className={classes.Container}>
            <p className={classes.Title}>{props.title}</p>
            <select className={classes.SelectContainer} onChange={(event) => props.handleChange(event.target.selectedIndex)} defaultValue={props.values[selectedIndex]}>
                {options}
            </select>
        </div>
    )
}

export default Select;
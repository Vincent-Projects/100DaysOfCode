import React from 'react';

import classes from './BuildControl.module.css';

const buildControl = (props) => {
    return (
        <div>
            <div>
                {props.label}
            </div>
            <button onClick={props.removeHandler}>Less</button>
            <button onClick={props.addHandler}>More</button>
        </div>
    )
};

export default buildControl;
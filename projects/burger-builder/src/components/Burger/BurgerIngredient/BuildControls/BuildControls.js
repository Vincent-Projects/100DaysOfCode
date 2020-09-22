import React from 'react';

import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Meat', type: 'meat' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Pickle', type: 'pickle' },

]

const buildControls = (props) => {
    return (
        <div>
            {controls.map(control => {
                return <BuildControl
                    key={control.type}
                    addHandler={() => props.addHandler(control.type)}
                    removeHandler={() => props.removeHandler(control.type)}
                    label={control.label} />
            })}
        </div>
    )
};

export default buildControls;
import React from 'react';
import classes from "./Graph.module.css";
import { weightPercentage } from "../../utils/weight/compareWeight";

const Graph = props => {
    const NBR_STEP = 5;
    let xValueMin = 0;
    let xValueMax = 0;
    let step = 0;
    let yValues = [];

    if ((props.data.filter(val => val !== null)).length > 0) {
        xValueMax = Math.max(...props.data) + 2;
        xValueMin = Math.min(...props.data.filter(value => value ? value : undefined)) - 2;
        step = Math.round((xValueMax - xValueMin) / NBR_STEP);

        for (let i = 0; i < NBR_STEP; i++) {
            yValues.push(xValueMin + (i * step));
        }

        yValues = yValues.reverse()
        yValues = yValues.map((value, index) => <p key={index}>{value}</p>);
    }



    let xValues = [];

    for (let i = 0; i < props.data.length; i++) {
        const nbrValue = props.nbrValue ? props.nbrValue[i] : 1;
        const nbrValueMax = props.nbrValueMax ? props.nbrValueMax[i] : 1;
        let intensity = nbrValue / nbrValueMax;
        const min_visibility = 0.2;
        if (intensity + min_visibility < 1 && intensity !== 0) {
            intensity += min_visibility;
        }
        let perc;
        if (props.data[i]) {
            perc = weightPercentage(xValueMax, xValueMin, props.data[i])
        } else {
            perc = 0;
        }

        xValues.push({
            percentage: perc,
            value: props.xValues[i],
            nbrValue: nbrValue,
            intensity: intensity
        });
    }

    const graphValue = xValues.map((value, index) => {
        return (
            <GraphValue
                key={index}
                title={value.value}
                percentage={value.percentage}
                nbrValue={value.nbrValue}
                intensity={value.intensity}
            />
        );
    });
    return (
        <div className={classes.GraphContainer}>
            <div className={classes.GraphTitle}>
                <h1>{props.title}</h1>
            </div>
            <div className={classes.GraphBody}>
                <div className={classes.GraphYContainer}>
                    {yValues}
                </div>
                <div className={classes.GraphXContainer}>
                    {graphValue}
                </div>
            </div>
        </div>
    );
}

const GraphValue = props => {
    return (
        <div className={classes.GraphColumnValue}>
            <div>{props.title}</div>
            <div className={classes.GraphPercentageBarContainer}>
                <div className={classes.GraphPercentageBar} style={{ height: `${props.percentage}%`, background: `rgba(26, 35, 126, ${props.intensity})` }}></div>
            </div>
        </div>
    )
}
export default Graph;
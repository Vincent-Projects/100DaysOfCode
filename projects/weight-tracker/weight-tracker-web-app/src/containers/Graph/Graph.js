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
        if (xValueMin < 0) {
            xValueMin = 0;
        }
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
            /* perc = weightPercentage(xValueMax, xValueMin, props.data[i]) */
            perc = Math.round((Math.abs(props.data[i] - xValueMin) / Math.abs(xValueMax - xValueMin)) * 100)
        } else {
            perc = 0;
        }

        let hoverData = props.hoverComponent && props.hoverComponent[i] ? props.hoverComponent[i] : null;

        xValues.push({
            percentage: perc,
            value: props.xValues[i],
            nbrValue: nbrValue,
            intensity: intensity,
            hoverData: hoverData
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
                hoverData={value.hoverData}
            />
        );
    });
    return (
        <div className={classes.GraphContainer}>
            <div className={classes.GraphTitle}>
                <h2 className={classes.Title}>{props.title}</h2>
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
    let hover = null;

    if (props.hoverData && props.percentage > 0) {
        hover = (
            <div className={classes.HoverData}>
                {props.hoverData}
            </div>
        );
    }
    return (
        <div className={classes.GraphColumnValue}>
            <div>{props.title}</div>
            <div className={classes.GraphPercentageBarContainer}>
                <div className={classes.GraphPercentageBar} style={{ height: `${props.percentage}%`, background: `rgba(26, 35, 126, ${props.intensity})` }}>
                    {hover}
                </div>
            </div>
        </div>
    )
}
export default Graph;
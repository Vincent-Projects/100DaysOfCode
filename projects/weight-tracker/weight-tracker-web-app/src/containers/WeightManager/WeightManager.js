import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import classes from './WeightManager.module.css';

import { isToday } from "../../utils/date/compareDate";
import {
    weightsDiff,
    averageWeightPerMonths,
    weightToCurrentWeekGraph,
    weightPercentage
} from '../../utils/weight/compareWeight';

import Graph from '../Graph/Graph';
import Grid, { Line, InLineGrid, Square } from "../Grid";

import AuthContext from "../../context/auth";



class WeightManager extends React.Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            weights: [],
        }
    }

    componentDidMount() {
        this._isMounted = true;

        const token = localStorage.getItem("authToken");

        if (token) {
            axios.get("https://weightrack.herokuapp.com/v1/weights/year/2020", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })
                .then(response => {
                    if (response.status === 200 && response.data.success && this._isMounted) {
                        this.setState({
                            weights: response.data.weights
                        });
                    }
                })
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }



    render() {
        const averageWeightsYear = averageWeightPerMonths(this.state.weights);
        return (
            <AuthContext.Consumer>
                {context => {
                    if (context.isAuth) {
                        return (
                            <Grid>
                                <Line lineLevel="One">
                                    <InLineGrid>
                                        <Square rowLevel="One">

                                        </Square>
                                        <Square rowLevel="Two">

                                        </Square>
                                        <Square rowLevel="Three">
                                            <div className={classes.GoalContainer}>
                                                {/*<h1 className={classes.GoalTitle}>Start / Goal</h1>
                                                <div className={classes.GoalBody}>
                                                    <p className={classes.Goal}>Start : {startWeight} / Goal : {goalWeight}</p>
                                                    <div className={classes.GoalPercentageBarContainer}>
                                                        <p className={classes.GoalPercentageBar} style={{ width: `${todayWeightPercent ? todayWeightPercent : (lastWeightPercent ? lastWeightPercent : 0)}%` }}>
                                                            {todayWeightPercent ? todayWeightPercent : (lastWeightPercent ? lastWeightPercent : 0)}%
                                </p>
                                                    </div>
                                                </div>*/}
                                            </div>
                                        </Square>
                                    </InLineGrid>
                                </Line>

                                <Line lineLevel="Two">
                                    <Square>
                                        <Graph
                                            title="Average Weight per Month"
                                            xValues={["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]}
                                            data={averageWeightsYear.avgWeights}
                                            nbrValueMax={averageWeightsYear.nbrDays}
                                            nbrValue={averageWeightsYear.nbrValues}
                                        />
                                    </Square>
                                </Line>

                                <Line lineLevel="Three">
                                    <InLineGrid>
                                        <Square rowLevel="One">

                                        </Square>
                                        <Square rowLevel="Two">

                                        </Square>
                                        <Square rowLevel="Three">
                                            <div className={classes.GoalContainer}>
                                                {/*<h1 className={classes.GoalTitle}>Start / Goal</h1>
                                                <div className={classes.GoalBody}>
                                                    <p className={classes.Goal}>Start : {startWeight} / Goal : {goalWeight}</p>
                                                    <div className={classes.GoalPercentageBarContainer}>
                                                        <p className={classes.GoalPercentageBar} style={{ width: `${todayWeightPercent ? todayWeightPercent : (lastWeightPercent ? lastWeightPercent : 0)}%` }}>
                                                            {todayWeightPercent ? todayWeightPercent : (lastWeightPercent ? lastWeightPercent : 0)}%
                                </p>
                                                    </div>
                                                </div>*/}
                                            </div>
                                        </Square>
                                    </InLineGrid>
                                </Line>
                            </Grid>
                        )
                    } else {
                        return <Redirect to="login" />
                    }
                }}
            </AuthContext.Consumer>
        );
    }
}

export default WeightManager;


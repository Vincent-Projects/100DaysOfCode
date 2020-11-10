import React from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import {
    weightsDiff,
    averageWeightPerMonths,
    weightToCurrentWeekGraph,
    weightPercentage,
    computeLastWeightComponent,
    todayRecordedWeight
} from '../../utils/weight/compareWeight';
import { isToday } from "../../utils/date/compareDate";

import Graph from '../Graph/Graph';
import Grid, { Line, InLineGrid, Square } from "../Grid";
import WeightCard from "./WeightCard/WeightCard";

import AuthContext from "../../context/auth";
import classes from './Dashboard.module.css';

class Dashboard extends React.Component {
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
                        let sortedWeights = response.data.weights;

                        /*if (Array.isArray(response.data.weights)) {
                            sortedWeights.sort((a, b) => {
                                if (new Date(a.date) > new Date(b.date)) {
                                    
                                }
                            })
                        }*/

                        this.setState({
                            weights: sortedWeights
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
        const currentWeek = weightToCurrentWeekGraph(this.state.weights);
        const lastWeight = computeLastWeightComponent(this.state.weights, 75, 90); // 75 : goal, 90 : start

        const lastWeightComponent = (
            lastWeight
                ? <WeightCard
                    title={lastWeight.title}
                    weight={lastWeight.weight}
                    weightDiff={lastWeight.weightDiff}
                    percentage={lastWeight.percentage}
                    isPositive={lastWeight.isPositive}
                    loss={lastWeight.loss}
                    helpTitle="Last Weight Recorded"
                    helpContent="We compute the last weight recorded by searching for the last weight that you kept track of that is not today."
                />
                : <p className={classes.Centered}>No Weight Recorded Yet</p>
        );

        const todayWeight = todayRecordedWeight(this.state.weights);

        const todayWeightComponent = (
            todayWeight
                ? <WeightCard
                    title={null}
                    weight={null}
                    weightDiff={null}
                    percentage={null}
                    isPositive={true}
                    loss={true}
                    helpTitle="Today Weight Record"
                    helpContent='This is the weight you recorded today. If you did not record any weight today then you see the message "No Weight Recorded"'
                />
                : <p className={classes.Centered}>No Weight Recorded Yet</p>
        );


        /*const weightsLenght = this.state.weights.length;
        let weightBeforeLast;
        let lastWeight;
        let todayWeight;
        let lastWeightDiff;
        let todayWeightDiff;

        if (weightsLenght > 0) {
            lastWeight = this.state.weights[weightsLenght - 1];
            weightBeforeLast = weightsLenght > 2 ? this.state.weights[weightsLenght - 2] : lastWeight;

            if (isToday(lastWeight.date)) {
                weightBeforeLast = weightsLenght > 3 ? this.state.weights[weightsLenght - 3] : lastWeight;
                lastWeight = this.state.weights[weightsLenght - 2];
                todayWeight = this.state.weights[weightsLenght - 1];
            }

            if (todayWeight && lastWeight) {
                todayWeightDiff = weightsDiff(todayWeight.weight, lastWeight.weight);
            } else {
                todayWeightDiff = null;
            }




            if (lastWeight) {
                lastWeightDiff = weightsDiff(weightBeforeLast.weight, lastWeight.weight);
            } else {
                lastWeightDiff = weightsDiff(0, 0);
            }
        }

        const goalWeight = 74;
        const startWeight = 90;
        let lastWeightPercent;
        let todayWeightPercent;

        if (lastWeight) {
            lastWeightPercent = weightPercentage(goalWeight, startWeight, lastWeight.weight);
        }

        if (todayWeight) {
            todayWeightPercent = weightPercentage(goalWeight, startWeight, todayWeight.weight);
        }*/

        return (
            <AuthContext.Consumer>
                {context => {
                    if (context.isAuth) {
                        return (
                            <Grid>
                                <Line lineLevel="One">
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

                                <Line lineLevel="Two">
                                    <InLineGrid>
                                        <Square rowLevel="One">
                                            {lastWeightComponent}
                                        </Square>
                                        <Square rowLevel="Two">
                                            {todayWeightComponent}
                                        </Square>
                                        <Square rowLevel="Three">
                                            {/*<div className={classes.GoalContainer}>
                                                <h1 className={classes.GoalTitle}>Start / Goal</h1>
                                                <div className={classes.GoalBody}>
                                                    <p className={classes.Goal}>Start : {startWeight} / Goal : {goalWeight}</p>
                                                    <div className={classes.GoalPercentageBarContainer}>
                                                        <p className={classes.GoalPercentageBar} style={{ width: `${todayWeightPercent ? todayWeightPercent : (lastWeightPercent ? lastWeightPercent : 0)}%` }}>
                                                            {todayWeightPercent ? todayWeightPercent : (lastWeightPercent ? lastWeightPercent : 0)}%
                                </p>
                                                    </div>
                                                </div>
                                        </div>*/}
                                        </Square>
                                    </InLineGrid>
                                </Line>

                                <Line lineLevel="Three">
                                    <Square>
                                        <Graph
                                            title="Weights of the week"
                                            xValues={["Monday", "Tuesday", "Wednesday", "Thurdsay", "Friday", "Saturday", "Sunday"]}
                                            data={currentWeek}
                                        />
                                    </Square>
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

export default Dashboard;


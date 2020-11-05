import classes from './Dashboard.module.css';
import React from 'react';
import { isToday } from "../../utils/date/compareDate";
import { weightsDiff, averageWeightPerMonths, weightToCurrentWeekGraph, weightPercentage } from '../../utils/weight/compareWeight';

import Graph from '../Graph/Graph';

import Grid, { Line, InLineGrid, Square } from "../Grid";
import axios from 'axios';
import WeightCard from "./WeightCard/WeightCard";

import AuthContext from "../../context/auth";
import { Redirect } from 'react-router-dom';

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
        const weightsLenght = this.state.weights.length;
        let weightBeforeLast;
        let lastWeight;
        let todayWeight;
        let lastWeightDiff;
        let todayWeightDiff;

        if (weightsLenght > 0) {
            weightBeforeLast = this.state.weights[weightsLenght - 2];
            lastWeight = this.state.weights[weightsLenght - 1];
            if (isToday(lastWeight.date)) {
                weightBeforeLast = this.state.weights[weightsLenght - 3];
                lastWeight = this.state.weights[weightsLenght - 2];
                todayWeight = this.state.weights[weightsLenght - 1];
            }

            if (todayWeight && lastWeight) {
                todayWeightDiff = weightsDiff(todayWeight.weight, lastWeight.weight);
            }
            if (lastWeight) {
                lastWeightDiff = weightsDiff(weightBeforeLast.weight, lastWeight.weight);
            }
        }


        const averageWeightsYear = averageWeightPerMonths(this.state.weights);
        const currentWeek = weightToCurrentWeekGraph(this.state.weights);

        const goalWeight = 74;
        const startWeight = 90;
        let lastWeightPercent;
        let todayWeightPercent;

        if (lastWeight) {
            lastWeightPercent = weightPercentage(goalWeight, startWeight, lastWeight.weight);
        }

        if (todayWeight) {
            todayWeightPercent = weightPercentage(goalWeight, startWeight, todayWeight.weight);
        }

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
                                            <WeightCard
                                                title={lastWeight ? lastWeight.date : null}
                                                weight={lastWeight ? lastWeight.weight : "no weight recorded"}
                                                weightDiff={lastWeightDiff}
                                                percentage={lastWeightPercent}
                                                isPositive={true}
                                                loss={true}
                                                helpTitle="Last Weight Recorded"
                                                helpContent="We compute the last weight recorded by searching for the last weight that you kept track of that is not today."
                                            />
                                        </Square>
                                        <Square rowLevel="Two">
                                            <WeightCard
                                                title={new Date()}
                                                weight={todayWeight ? todayWeight.weight : "no weight recorded"}
                                                weightDiff={todayWeightDiff}
                                                percentage={todayWeightPercent}
                                                isPositive={false}
                                                loss={false}
                                                helpTitle="Today Weight Record"
                                                helpContent='This is the weight you recorded today. If you did not record any weight today then you see the message "No Weight Recorded"'
                                            />
                                        </Square>
                                        <Square rowLevel="Three">
                                            <div className={classes.GoalContainer}>
                                                <h1 className={classes.GoalTitle}>Start / Goal</h1>
                                                <div className={classes.GoalBody}>
                                                    <p className={classes.Goal}>Start : {startWeight} / Goal : {goalWeight}</p>
                                                    <div className={classes.GoalPercentageBarContainer}>
                                                        <p className={classes.GoalPercentageBar} style={{ width: `${todayWeightPercent ? todayWeightPercent : (lastWeightPercent ? lastWeightPercent : 0)}%` }}>
                                                            {todayWeightPercent ? todayWeightPercent : (lastWeightPercent ? lastWeightPercent : 0)}%
                                </p>
                                                    </div>
                                                </div>
                                            </div>
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


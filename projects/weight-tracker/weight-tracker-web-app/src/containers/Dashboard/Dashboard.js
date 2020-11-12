import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import {
    weightsDiff,
    averageWeightPerMonths,
    weightToCurrentWeekGraph,
    weightPercentage,
    computeLastWeightComponent,
    todayRecordedWeight,
    sortWeightPerDate
} from '../../utils/weight/compareWeight';
import { isToday } from "../../utils/date/compareDate";

import Graph from '../Graph/Graph';
import Grid, { Line, InLineGrid, Square } from "../Grid";
import WeightCard from "./WeightCard/WeightCard";
import LoadingSpinner from "../../components/LoadingSpiner/LoadingSpiner";
import MonthWeightInfo from "../../components/MonthWeightInfo/MonthWeightInfo";

import AuthContext from "../../context/auth";
import classes from './Dashboard.module.css';

class Dashboard extends React.Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            weights: [],
            start: null,
            goal: null,
            isLoading: false
        }
    }

    componentDidMount() {
        this._isMounted = true;

        const token = localStorage.getItem("authToken");
        const expireDate = localStorage.getItem("authTokenExpireDate");

        if (token && expireDate) {
            const expireDateFormat = new Date(expireDate);
            const currentDate = new Date();

            if (currentDate < expireDateFormat) {
                this.setState({
                    isLoading: true
                });
                axios.get("https://weightrack.herokuapp.com/v1/weights/year/2020", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                })
                    .then(response => {
                        if (response.status === 200 && response.data.success && this._isMounted) {
                            let sortedWeights = sortWeightPerDate(response.data.weights);

                            this.setState({
                                weights: sortedWeights
                            });
                        }
                    })
                axios.get("http://localhost:8080/user/weight-info", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                })
                    .then(response => {
                        if (response.status === 200 && response.data.success && this._isMounted) {
                            const start = response.data.data.start !== -1 ? response.data.data.start : null;
                            const goal = response.data.data.goal !== -1 ? response.data.data.goal : null;
                            this.setState({
                                start: start,
                                goal: goal,
                                isLoading: false
                            });
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })
            } else {
                // HERE I NEED TO CLEAR LOCALSTORAGE
                // THEN SET ISAUTH TO FALSE IN APP.JS
            }
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }



    render() {
        if (this.state.isLoading) {
            return <LoadingSpinner />
        }

        const averageWeightsYear = averageWeightPerMonths(this.state.weights);
        const currentWeek = weightToCurrentWeekGraph(this.state.weights);
        const lastWeight = computeLastWeightComponent(this.state.weights, this.state.goal, this.state.start);

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

        const todayWeight = todayRecordedWeight(this.state.weights, this.state.goal, this.state.start);

        const todayWeightComponent = (
            todayWeight
                ? <WeightCard
                    title={todayWeight.title}
                    weight={todayWeight.weight}
                    weightDiff={todayWeight.weightDiff}
                    percentage={todayWeight.percentage}
                    isPositive={todayWeight.isPositive}
                    loss={todayWeight.loss}
                    helpTitle="Today Weight Record"
                    helpContent='This is the weight you recorded today. If you did not record any weight today then you see the message "No Weight Recorded"'
                />
                : <p className={classes.Centered}>No Weight Recorded Yet</p>
        );

        const isGoalSet = (this.state.start && this.state.goal ? true : false);

        const goalComponent = (
            isGoalSet
                ? (
                    <div className={classes.GoalContainer}>
                        <h2 className={classes.GoalTitle}>Start / Goal</h2>
                        <div className={classes.GoalBody}>
                            <p className={classes.Goal}>Start : {this.state.start} / Goal : {this.state.goal}</p>
                            <div className={classes.GoalPercentageBarContainer}>
                                <p className={classes.GoalPercentageBar} style={{ width: `${todayWeight ? todayWeight.percentage : (lastWeight ? lastWeight.percentage : 0)}%` }}>
                                    {todayWeight ? todayWeight.percentage : (lastWeight ? lastWeight.percentage : 0)}%
                </p>
                            </div>
                        </div>
                    </div>
                )
                : <p className={classes.Centered}>No Goal Recorded yet</p>
        );

        // CREATE A WAY TO GENERATE TOOLTIP FOR GRAPH AUTOMATICALLY
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
                                            hoverComponent={[null, null, null, null, null, null, null, null, null, null,
                                                <MonthWeightInfo
                                                    title="Weights info for November"
                                                    content={<>
                                                        <p style={{ marginBottom: "0.5rem" }}>Total weights recorded this month : 12</p>
                                                        <p>Average weights this month : 77.45kg</p>
                                                    </>}
                                                />,
                                                null]}
                                        />{/* HERE NEED A FUNCTION TO GENERATE THOSE VALUE */}
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
                                            {goalComponent}
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


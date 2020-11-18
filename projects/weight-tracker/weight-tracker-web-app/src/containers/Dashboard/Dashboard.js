import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import api from "../../api";
import { connect } from "react-redux";

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


import CenteredErrorPage from "../../components/Errors/CenteredErrorPage/CenteredErrorPage";

import Graph from '../../components/Graph/Graph';
import Grid, { Line, InLineGrid, Square } from "../Grid";
import WeightCard from "./WeightCard/WeightCard";
import LoadingSpinner from "../../components/LoadingSpiner/LoadingSpiner";
import MonthWeightInfo from "../../components/MonthWeightInfo/MonthWeightInfo";

import isLogged from "../../hoc/isLogged";

import AuthContext from "../../context/auth";
import WeightsContext from "../../context/weights";

import classes from './Dashboard.module.css';

class Dashboard extends React.Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            weights: [],
            start: null,
            goal: null,
            isLoading: false,
            errors: null
        }
    }

    componentDidMount() {
        this._isMounted = true;

        const config = {
            headers: {
                Authorization: `Bearer ${this.props.token}`
            }
        };
        const getYearWeightsUrl = "/weights/year/2020";
        const getWeightsInfoUrl = "/user/weight-info";

        this.setState({
            isLoading: true
        });

        Promise.all([
            api.get(getYearWeightsUrl, config),
            api.get(getWeightsInfoUrl, config)
        ])
            .then(response => {
                let weightsInfo;
                let yearWeights;
                let start;
                let goal;

                if (response[0].config.url === getYearWeightsUrl
                    && response[0].status === 200
                    && response[0].data.success) {
                    weightsInfo = response[1].data.data;
                    yearWeights = response[0].data.success ? response[0].data.data : null;
                } else if (response[1].config.url === getYearWeightsUrl
                    && response[1].status === 200
                    && response[1].data.success) {
                    weightsInfo = response[0].data.data;
                    yearWeights = response[1].data.success ? response[1].data.data : null;
                }

                if (yearWeights) {
                    yearWeights = sortWeightPerDate(yearWeights.weights);
                }

                if (weightsInfo) {
                    start = weightsInfo.start !== -1 ? weightsInfo.start : null;
                    goal = weightsInfo.goal !== -1 ? weightsInfo.goal : null;
                }

                if (this._isMounted) {
                    this.setState({
                        weights: yearWeights,
                        start: start,
                        goal: goal,
                        isLoading: false
                    });
                }
            })
            .catch(err => {
                if (this._isMounted) {
                    this.setState({
                        isLoading: false,
                        errors: "There was a problem with fetching data. Try to reload later"
                    });
                }
            });

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
                : <div className={classes.Centered}>
                    <p>No Weight Recorded Yet</p>
                    <Link className={classes.Btn} to="/weight-manager">Save your weigth</Link>
                </div>
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
                : <div className={classes.Centered}>
                    <p>No Weight Recorded Yet</p>
                    <Link className={classes.Btn} to="/weight-manager">Save your weigth</Link>
                </div>
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

        if (this.state.errors) {
            return <CenteredErrorPage errorMessage={this.state.errors} />
        }

        if (this.props.isAuth) {
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

                            />{/* HERE NEED A FUNCTION TO GENERATE THOSE VALUE 
                                        
                                        hoverComponent={[null, null, null, null, null, null, null, null, null, null,
                                                <MonthWeightInfo
                                                    title="Weights info for November"
                                                    content={<>
                                                        <p style={{ marginBottom: "0.5rem" }}>Total weights recorded this month : 12</p>
                                                        <p>Average weights this month : 77.45kg</p>
                                                    </>}
                                                />,
                                                null]}
                                        
                                        
                                        */}
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
        // CREATE A WAY TO GENERATE TOOLTIP FOR GRAPH AUTOMATICALLY
    }
}

Dashboard.contextType = WeightsContext;

const mapStateToProps = state => {
    return {
        isAuth: state.isAuth,
        token: state.token
    }
};

export default connect(mapStateToProps)(Dashboard);


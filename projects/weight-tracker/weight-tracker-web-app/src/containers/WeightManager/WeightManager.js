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
import NumberInput from "./NumberInput/NumberInput";


class WeightManager extends React.Component {
    _isMounted = false;
    _isTyping = false;
    _typingNbr = 0;

    constructor(props) {
        super(props);
        this.state = {
            weights: [],
            todayWeight: 0,
            startWeight: 0,
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
                        let todayWeight = 0;
                        if (response.data.weights.length > 0 && isToday(response.data.weights[response.data.weights.length - 1].date)) {
                            todayWeight = response.data.weights[response.data.weights.length - 1].weight;
                        }
                        this.setState({
                            weights: response.data.weights,
                            todayWeight: todayWeight
                        });
                    }
                })

            axios.get("https://weightrack.herokuapp.com/v1/weight/start", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })
                .then(response => {
                    if (response.status === 200 && response.data.success && this._isMounted) {
                        this.setState({
                            startWeight: response.data.start
                        });
                    }
                })
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    handleTodayWeightChange = (event) => {
        this._isTyping = true;
        this._typingNbr++;
        this.setState({
            todayWeight: event.target.value
        });
        setTimeout(() => {
            this._typingNbr--;
            this._isTyping = false;
        }, 3000);

        this.sendWeight()
    }

    sendWeight = () => {
        setTimeout(() => {
            if (this._typingNbr === 0 && !this._isTyping) {
                const token = localStorage.getItem("authToken");

                axios.post("https://weightrack.herokuapp.com/v1/weight/add", {
                    weight: this.state.todayWeight
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }).then(response => {
                    if (response.status === 200 && response.data.success) {
                        console.log("Success");
                    } else {
                        console.log("Fail");
                    }
                }).catch(err => {
                    console.log("Error");
                })
            }
        }, 3000);
    }

    handleAddWeight = (value) => {
        this._isTyping = true;
        this._typingNbr++;
        this.setState((prevState, props) => {
            return {
                todayWeight: +prevState.todayWeight + +value
            }
        });

        setTimeout(() => {
            this._typingNbr--;
            this._isTyping = false;
        }, 3000);

        this.sendWeight();
    }

    handleStartWeightChange = (event) => {
        this._isTyping = true;
        this._typingNbr++;
        this.setState({
            startWeight: event.target.value
        })

        setTimeout(() => {
            this._typingNbr--;
            this._isTyping = false;
        }, 3000);

        this.sendStartWeight();
    }

    handleAddStartWeight = value => {
        this._isTyping = true;
        this._typingNbr++;
        this.setState((prevState, props) => {
            return {
                startWeight: +prevState.startWeight + +value
            }
        });

        setTimeout(() => {
            this._typingNbr--;
            this._isTyping = false;
        }, 3000);

        this.sendStartWeight();
    }

    sendStartWeight = () => {
        setTimeout(() => {
            if (this._typingNbr === 0 && !this._isTyping) {
                const token = localStorage.getItem("authToken");

                axios.post("http://localhost:8080/weights/today/add", {
                    weight: this.state.todayWeight
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }).then(response => {
                    if (response.status === 200 && response.data.success) {
                        alert("Success");
                    } else {
                        alert("Fail");
                    }
                }).catch(err => {
                    alert("Error");
                })
            }
        }, 3000);
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
                                            <NumberInput
                                                title="Start Weight"
                                                handleIncrement={this.handleStartAddWeight}
                                                value={this.state.startWeight}
                                                handleInputChange={this.handleStartWeightChange}
                                            />
                                        </Square>
                                        <Square rowLevel="Two">
                                            <NumberInput
                                                title="Today's Weight"
                                                handleIncrement={this.handleAddWeight}
                                                value={this.state.todayWeight}
                                                handleInputChange={this.handleTodayWeightChange}
                                            />
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


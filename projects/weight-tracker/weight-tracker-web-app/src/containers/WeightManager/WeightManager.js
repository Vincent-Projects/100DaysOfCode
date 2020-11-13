import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import classes from './WeightManager.module.css';

import { isToday } from "../../utils/date/compareDate";
import {
    weightsDiff,
    averageWeightPerMonths,
    weightToCurrentWeekGraph,
    weightPercentage,
    sortWeightPerDate
} from '../../utils/weight/compareWeight';

import Graph from '../Graph/Graph';
import Grid, { Line, InLineGrid, Square } from "../Grid";
import LoadingSpiner from "../../components/LoadingSpiner/LoadingSpiner";
import MonthWeightInfo from "../../components/MonthWeightInfo/MonthWeightInfo";

import isLogged from "../../hoc/isLogged";
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
            goalWeight: 0,
            isLoading: false,
            todayLoading: false,
            startLoading: false,
            goalLoading: false,
            nbWeight: 0
        }
    }

    componentDidMount() {
        this._isMounted = true;

        this.setState({
            isLoading: true
        });
        axios.get("http://localhost:8080/weights/year/2020", {
            headers: {
                Authorization: `Bearer ${this.props.token}`,
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                if (response.status === 200 && response.data.success && this._isMounted) {
                    let todayWeight = 0;

                    if (response.data.data.weights.length > 0) {
                        const sortedWeight = sortWeightPerDate(response.data.data.weights);
                        if (isToday(sortedWeight[0].date))
                            todayWeight = sortedWeight[0].weight;
                    }
                    this.setState({
                        weights: response.data.data.weights,
                        todayWeight: todayWeight
                    });
                }
            })

        axios.get("http://localhost:8080/user/weight-info", {
            headers: {
                Authorization: `Bearer ${this.props.token}`,
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                if (response.status === 200 && response.data.success && this._isMounted) {
                    this.setState({
                        startWeight: response.data.data.start,
                        goalWeight: response.data.data.goal,
                        nbWeight: response.data.data.nb_weights,
                        isLoading: false
                    });
                }
            })
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
                this.setState({
                    todayLoading: true,
                });

                axios.post("http://localhost:8080/weights/today/add", {
                    weight: this.state.todayWeight
                }, {
                    headers: {
                        Authorization: `Bearer ${this.props.token}`,
                        "Content-Type": "application/json"
                    }
                }).then(response => {
                    if (response.status === 200 && response.data.success) {
                        this.setState({
                            todayLoading: false,
                        });
                    } else {
                        this.setState({
                            todayLoading: false,
                            // ADD VISUAL ERROR EFFECT
                        });
                    }
                }).catch(err => {
                    this.setState({
                        todayLoading: false,
                        // ADD VISUAL ERROR EFFECT
                    });
                })
            }
        }, 3000);
    }

    handleAddWeight = (value) => {
        this._isTyping = true;
        this._typingNbr++;
        this.setState((prevState, props) => {
            return {
                todayWeight: +prevState.todayWeight + +value,
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
                this.setState({
                    startLoading: true,
                });

                axios.post("http://localhost:8080/user/weight-info/update", {
                    start: this.state.startWeight,
                    goal: this.state.goalWeight
                }, {
                    headers: {
                        Authorization: `Bearer ${this.props.token}`,
                        "Content-Type": "application/json"
                    }
                }).then(response => {
                    if (response.status === 201 && response.data.success) {
                        this.setState({
                            startLoading: false,
                        });
                    } else {
                        this.setState({
                            startLoading: false,
                            // ADD ERROR VISUAL EFFECT
                        });
                    }
                }).catch(err => {
                    this.setState({
                        startLoading: false,
                        // ADD ERROR VISUAL EFFECT
                    });
                })
            }
        }, 3000);
    }

    handleGoalWeightChange = (event) => {
        this._isTyping = true;
        this._typingNbr++;
        this.setState({
            goalWeight: event.target.value
        })

        setTimeout(() => {
            this._typingNbr--;
            this._isTyping = false;
        }, 3000);

        this.sendGoalWeight();
    }

    handleAddGoalWeight = value => {
        this._isTyping = true;
        this._typingNbr++;
        this.setState((prevState, props) => {
            return {
                goalWeight: +prevState.goalWeight + +value
            }
        });

        setTimeout(() => {
            this._typingNbr--;
            this._isTyping = false;
        }, 3000);

        this.sendGoalWeight();
    }

    sendGoalWeight = () => {
        setTimeout(() => {
            if (this._typingNbr === 0 && !this._isTyping) {
                this.setState({
                    goalLoading: true,
                });

                axios.post("http://localhost:8080/user/weight-info/update", {
                    start: this.state.startWeight,
                    goal: this.state.goalWeight
                }, {
                    headers: {
                        Authorization: `Bearer ${this.props.token}`,
                        "Content-Type": "application/json"
                    }
                }).then(response => {
                    if (response.status === 201 && response.data.success) {
                        this.setState({
                            goalLoading: false,
                        });
                    } else {
                        this.setState({
                            goalLoading: false,
                            // ADD ERROR VISUAL EFFECT
                        });
                    }
                }).catch(err => {
                    this.setState({
                        goalLoading: false,
                        // ADD ERROR VISUAL EFFECT
                    });
                })
            }
        }, 3000);
    }


    render() {
        if (this.state.isLoading) {
            return <LoadingSpiner />;
        }

        const averageWeightsYear = averageWeightPerMonths(this.state.weights);

        const todayWeightManager = this.state.todayLoading ? <LoadingSpiner /> : <NumberInput
            title="Today's Weight"
            handleIncrement={this.handleAddWeight}
            value={this.state.todayWeight}
            handleInputChange={this.handleTodayWeightChange}
        />;

        const startWeightManager = this.state.startLoading ? <LoadingSpiner /> : <NumberInput
            title="Start Weight"
            handleIncrement={this.handleAddStartWeight}
            value={this.state.startWeight}
            handleInputChange={this.handleStartWeightChange}
        />

        const goalWeightManager = this.state.goalLoading ? <LoadingSpiner /> : <NumberInput
            title="Goal Weight"
            handleIncrement={this.handleAddGoalWeight}
            value={this.state.goalWeight}
            handleInputChange={this.handleGoalWeightChange}
        />

        return (
            <AuthContext.Consumer>
                {context => {
                    if (context.isAuth) {
                        return (
                            <Grid>
                                <Line lineLevel="One">
                                    <InLineGrid>
                                        <Square rowLevel="One">
                                            {startWeightManager}
                                        </Square>
                                        <Square rowLevel="Two">
                                            {todayWeightManager}
                                        </Square>
                                        <Square rowLevel="Three">
                                            {goalWeightManager}
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

                                <Line lineLevel="Three">
                                    <InLineGrid>
                                        {/*<Square rowLevel="One">

                                            </Square>*/}
                                        <Square rowLevel="Two">
                                            <div className={classes.Container}>
                                                <h2 className={classes.Title}>Total Weights Recorded</h2>
                                                <p className={classes.Centered}>{this.state.nbWeight}</p>
                                            </div>
                                        </Square>
                                        {/*<Square rowLevel="Three">
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
                                        </Square>*/}
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

export default isLogged(WeightManager);


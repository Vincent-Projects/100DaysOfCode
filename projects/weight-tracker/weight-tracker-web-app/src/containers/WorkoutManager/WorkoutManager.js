import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import api from "../../api";

import {
    sortWorkoutsPerDate,
    filterNumberWorkoutsPerMonth
} from "../../utils/workouts/compareWorkout";

import Graph from '../../components/Graph/Graph';
import Grid, { Line, InLineGrid, Square } from "../Grid";
import LoadingSpiner from "../../components/LoadingSpiner/LoadingSpiner";
import EmojiChoice from "./EmojiChoice/EmojiChoice";
import Alert from "../../components/Alert/Alert";

import isLogged from "../../hoc/isLogged";

import AuthContext from "../../context/auth";
import classes from "./WorkoutManager.module.css";

class WorkoutManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            todayFeeling: null,
            todayDone: false,
            workouts: [],
            nbrWorkouts: 0,
            isAlertActive: false,
            alertContent: null
        }
    }

    componentDidMount() {
        const config = {
            headers: {
                Authorization: `Bearer ${this.props.token}`
            }
        };
        this.setState({
            isLoading: true,
        });
        api.get('/today/info', config)
            .then(response => {
                if (response.status === 200 && response.data.success) {
                    this.setState({
                        isLoading: false,
                        todayDone: response.data.data.done,
                        todayFeeling: response.data.data.feeling
                    });
                } else if (response.status === 204) {
                    this.setState({
                        isLoading: false,
                        todayDone: false,
                        todayFeeling: null
                    });
                } else {
                    // HERE HANDLE ERROR
                }
            }).catch(err => {
                console.log(err); // HERE HANDLE ERROR
            })
        api.get('/workout/year/2020', config)
            .then(response => {
                if (response.status === 200 && response.data.success) {
                    this.setState({
                        isLoading: false,
                        workouts: sortWorkoutsPerDate(response.data.data.workouts)
                    });
                } else {
                    // HERE HANDLE ERROR
                }
            }).catch(err => {
                console.log(err); // HERE HANDLE ERROR
            })
        api.get('/user/workout-info', config)
            .then(response => {
                if (response.status === 200 && response.data.success) {
                    this.setState({
                        isLoading: false,
                        nbrWorkouts: response.data.data.nb_workouts
                    });
                } else {
                    // HERE HANDLE ERROR
                }
            }).catch(err => {
                console.log(err); // HERE HANDLE ERROR
            })
    }

    handleTodayDone = () => {
        this.setState((prevState) => {
            return {
                todayDone: !prevState.todayDone,
                nbrWorkouts: prevState.nbrWorkouts + 1
            }
        }, this.sendData);
    }

    sendData = () => {
        const data = {
            done: this.state.todayDone,
            feeling: this.state.todayFeeling
        };

        const config = {
            headers: {
                Authorization: `Bearer ${this.props.token}`
            }
        };

        api.post("/workout/today/add", data, config)
            .then(response => {
                if (response.status === 200 && response.data.success) {
                    this.setState({
                        isAlertActive: true,
                        alertContent: response.data.message
                    });
                } else {
                    alert("Error"); // Remove the last change from state
                }
            })
            .catch(err => {
                console.log("ERROR OCCUR");
                // Catch Error with Visual Effect
            })
    }

    handleTodayFeelingChange = (feeling) => {
        this.setState({
            todayFeeling: feeling
        }, this.sendData);
    }

    render() {
        const filteredMonth = filterNumberWorkoutsPerMonth(this.state.workouts);
        return (
            <AuthContext.Consumer>
                {context => {
                    if (context.isAuth) {
                        return (
                            <Grid>
                                <Alert
                                    title="Successfull Save"
                                    content={this.state.alertContent}
                                    handleValid={() => {
                                        this.setState({ isAlertActive: false })
                                        // HERE MAKE UPDATE OF OTHER DATA
                                    }}
                                    validMessage={"Good !"}
                                    isActive={this.state.isAlertActive}
                                />
                                <Line lineLevel="One">
                                    <Square>
                                        <Graph
                                            title="Number of Workouts per Month"
                                            xValues={["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]}
                                            data={filteredMonth.nbrWorkouts}
                                            nbrValueMax={filteredMonth.nbrDaysPerMonth}
                                            nbrValue={filteredMonth.nbrWorkouts}
                                        />
                                        {/*hoverComponent={[null, null, null, null, null, null, null, null, null, null,
                                                    <MonthWeightInfo
                                                        title="Weights info for November"
                                                        content={<>
                                                            <p style={{ marginBottom: "0.5rem" }}>Total weights recorded this month : 12</p>
                                                            <p>Average weights this month : 77.45kg</p>
                                                        </>}
                                                    />,
                                                    null]}
                                            /> HERE NEED A FUNCTION TO GENERATE THOSE VALUE */}
                                    </Square>
                                </Line>

                                <Line lineLevel="Two">
                                    <InLineGrid>
                                        <Square rowLevel="One">
                                            <div className={classes.CardContainer}>
                                                <h2 className={classes.CardTitle}>Today's Workout</h2>
                                                <div className={classes.CardBody}>
                                                    <input className={classes.CheckBox} type="checkbox" checked={this.state.todayDone} onChange={this.handleTodayDone} />
                                                </div>
                                            </div>
                                        </Square>
                                        <Square rowLevel="Two">
                                            <div className={classes.CardContainer}>
                                                <h2 className={classes.CardTitle}>Today's Feeling</h2>
                                                <div className={classes.CardBody}>
                                                    <EmojiChoice
                                                        todayFeeling={this.state.todayFeeling}
                                                        handleFeelingChange={this.handleTodayFeelingChange}
                                                    />
                                                </div>
                                            </div>
                                        </Square>
                                        <Square rowLevel="Three">
                                            <div className={classes.CardContainer}>
                                                <h2 className={classes.CardTitle}>Total Workouts</h2>
                                                <div className={classes.CardBody}>
                                                    <p className={classes.WorkoutNumber}>{this.state.nbrWorkouts}</p>
                                                </div>
                                            </div>
                                        </Square>
                                    </InLineGrid>
                                </Line>

                                <Line lineLevel="Three">
                                    <InLineGrid>

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

export default isLogged(WorkoutManager);
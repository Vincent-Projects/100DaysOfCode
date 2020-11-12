import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import Graph from '../Graph/Graph';
import Grid, { Line, InLineGrid, Square } from "../Grid";
import LoadingSpiner from "../../components/LoadingSpiner/LoadingSpiner";
import EmojiChoice from "./EmojiChoice/EmojiChoice";

import AuthContext from "../../context/auth";
import classes from "./WorkoutManager.module.css";

class WorkoutManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todayFeeling: null,
        }
    }

    handleTodayFeelingChange = (feeling) => {
        this.setState({
            todayFeeling: feeling
        })
    }

    render() {
        return (
            <AuthContext.Consumer>
                {context => {
                    if (context.isAuth) {
                        return (
                            <Grid>
                                <Line lineLevel="One">
                                    <Square>
                                        <Graph
                                            title="Number of Workouts per Month"
                                            xValues={["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]}
                                            data={[]}
                                            nbrValueMax={[]}
                                            nbrValue={[]}
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
                                                    <input className={classes.CheckBox} type="checkbox" />
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
                                            </div>
                                        </Square>
                                    </InLineGrid>
                                </Line>

                                <Line lineLevel="Three">
                                    <InLineGrid>
                                        {/*<Square rowLevel="One">

                                            </Square>
                                        <Square rowLevel="Two">
                                            <div className={classes.Container}>
                                                <h2 className={classes.Title}>Total Weights Recorded</h2>
                                                <p className={classes.Centered}>{this.state.nbWeight}</p>
                                            </div>
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

export default WorkoutManager;
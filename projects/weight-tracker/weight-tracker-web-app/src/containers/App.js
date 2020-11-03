import React, { Component } from 'react';
import classes from './App.module.css';
import { isToday } from "../utils/date/compareDate";
import { weightsDiff, averageWeightPerMonths, weightToCurrentWeekGraph } from '../utils/weight/compareWeight';

import axios from "axios";

import Dashboard from "./Dashboard/Dashboard";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            weights: []
        }
    }

    componentDidMount() {
        axios.get("https://weightrack.herokuapp.com/v1/weights/year/2020", {
            headers: {
                Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjY5ZjQ5NDllYTU4MjNhYmNkN2U1OTciLCJpYXQiOjE2MDQ0MDk1NjgsImV4cCI6MTYwNDQxMzE2OH0.1VMNX4sozUPcKlJGH3Mdxb5uVtGvw9_3yE0Ymgthse8",
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                if (response.status === 200 && response.data.success) {
                    this.setState({
                        weights: response.data.weights
                    });
                }
            })
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

            if (todayWeight) {
                todayWeightDiff = 0;//weightsDiff(todayWeight.weight, lastWeight.weight) || 0;
            }
            lastWeightDiff = weightsDiff(weightBeforeLast.weight, lastWeight.weight);
        }


        const averageWeightsYear = averageWeightPerMonths(this.state.weights);
        const currentWeek = weightToCurrentWeekGraph(this.state.weights);
        return (
            <div className={classes.App}>
                <div className={classes.ToolBar}>
                    <nav>
                        <ul>
                            <li>Home</li>
                            <li>Weight</li>
                            <li>Workout</li>
                        </ul>
                    </nav>
                </div>
                <div className={classes.ToolBarMargin}>
                    <Dashboard
                        lastWeight={lastWeight}
                        lastWeightDiff={lastWeightDiff}
                        todayWeight={todayWeight}
                        todayWeightDiff={todayWeightDiff}
                        startWeight={85}
                        goalWeight={75}
                        yearAvg={averageWeightsYear.avgWeights}
                        yearNbrDays={averageWeightsYear.nbrDays}
                        yearNbrValues={averageWeightsYear.nbrValues}
                        currentWeekWeights={currentWeek}
                    />
                </div>
            </div>
        );
    }
}


export default App;
import React from 'react';
import { weightPercentage } from '../../utils/weight/compareWeight';

import Graph from '../Graph/Graph';

import Grid, { Line, InLineGrid, Square } from "../Grid";

import WeightCard from "./WeightCard/WeightCard";

const Dashboard = props => {
    const goalWeight = 78;
    const startWeight = 90;
    let lastWeightPercent;
    let todayWeightPercent;

    if (props.lastWeight) {
        lastWeightPercent = weightPercentage(goalWeight, startWeight, props.lastWeight.weight);
    }

    if (props.todayWeight) {
        todayWeightPercent = weightPercentage(goalWeight, startWeight, props.todayWeight);
    }


    return (
        <Grid>
            <Line lineLevel="One">
                <Square>
                    <Graph
                        title="Average Weight per Month"
                        xValues={["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]}
                        data={props.yearAvg}
                        nbrValueMax={props.yearNbrDays}
                        nbrValue={props.yearNbrValues}
                    />
                </Square>
            </Line>

            <Line lineLevel="Two">
                <InLineGrid>
                    <Square rowLevel="One">
                        <WeightCard
                            title={props.lastWeight ? props.lastWeight.date : null}
                            weight={props.lastWeight ? props.lastWeight.weight : "no weight recorded"}
                            weightDiff={props.lastWeightDiff}
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
                            weight={props.todayWeight ? props.todayWeight.weight : "no weight recorded"}
                            weightDiff={props.todayWeightDiff}
                            percentage={todayWeightPercent}
                            isPositive={false}
                            loss={false}
                            helpTitle="Today Weight Record"
                            helpContent='This is the weight you recorded today. If you did not record any weight today then you see the message "No Weight Recorded"'
                        />
                    </Square>
                    <Square rowLevel="Three">
                        <div>
                            <h1>Start / Goal</h1>
                            <p>Start : {startWeight} / Goal : {goalWeight}</p>
                            <div>
                                {todayWeightPercent ? todayWeightPercent : (lastWeightPercent ? lastWeightPercent : 0)}%
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
                        data={props.currentWeekWeights}
                    />
                </Square>
            </Line>
        </Grid>
    );
}

export default Dashboard;


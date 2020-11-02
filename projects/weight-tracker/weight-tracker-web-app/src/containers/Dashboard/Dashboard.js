import React from 'react';
import { weightPercentage } from '../../utils/weight/compareWeight';

import Grid, { Line, InLineGrid, Square } from "../Grid";

import WeightCard from "./WeightCard/WeightCard";

const Dashboard = props => {
    const goalWeight = 78;
    const startWeight = 90;
    let lastWeightPercent
    let todayWeightPercent = weightPercentage(goalWeight, startWeight, (props.todayWeight ? props.todayWeight.weight : 0));
    if (props.lastWeight) {
        console.log(weightPercentage(goalWeight, startWeight, 73))
        lastWeightPercent = weightPercentage(goalWeight, startWeight, props.lastWeight.weight);
    }

    return (
        <Grid>
            <Line lineLevel="One">
                <Square>
                    <h1>Graph</h1>
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
                            helpTitle="Title of the first help button"
                            helpContent="This is the content for the first button to help the user to understand what this card is about"
                        />
                    </Square>
                    <Square rowLevel="Two">
                        <WeightCard
                            title={props.todayWeight ? props.todayWeight.date : null}
                            weight={props.todayWeight ? props.todayWeight.weight : "no weight recorded"}
                            weightDiff={props.todayWeightDiff}
                            percentage={todayWeightPercent}
                            isPositive={false}
                            loss={false}
                            helpTitle="Title of the second help button"
                            helpContent="This is the content for the second button to help the user to understand what this card is about"
                        />
                    </Square>
                    <Square rowLevel="Three">
                        <h1>3</h1>
                        <p>Content</p>
                    </Square>
                </InLineGrid>
            </Line>

            <Line lineLevel="Three">
                <Square>
                    <h1>Graph</h1>
                </Square>
            </Line>
        </Grid>
    );
}

export default Dashboard;


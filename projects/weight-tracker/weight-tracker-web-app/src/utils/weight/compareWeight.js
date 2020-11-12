import { isToday, isYesterday } from "../date/compareDate";

export const weightsDiff = (weight1, weight2) => {
    return Math.round(Math.abs(weight1 - weight2) * 100) / 100;
}

export const weightPercentage = (goal, start, current) => {
    if (!goal || !start || !current) {
        return null;
    }
    return Math.round(100 - ((current - goal) * 100) / (start - goal));
}

export const averageWeightPerMonths = (weights) => {
    const weightsSPlited = [];
    const weightsAverage = [];
    const nbrDaysPerMonth = [];
    const nbrValuesPerMonth = [];

    for (let i = 0; i < 12; i++) {
        if (weights.length > 0) {
            const month = new Date();
            month.setMonth(i);
            month.setDate(0);
            const weightMonthI = weights.filter(weight => new Date(weight.date).getMonth() === i);
            weightsSPlited.push(weightMonthI);
            nbrDaysPerMonth.push(month.getDate());
        }
    }

    for (let i = 0; i < weightsSPlited.length; i++) {
        if (weightsSPlited[i].length > 0) {
            const sum = weightsSPlited[i].reduce((acc, weight) => acc + weight.weight, 0);
            const average = Math.round((sum / weightsSPlited[i].length) * 100) / 100;
            weightsAverage.push(average);
            nbrValuesPerMonth.push(weightsSPlited[i].length);
        } else {
            weightsAverage.push(null);
            nbrValuesPerMonth.push(0);
        }
    }


    return {
        avgWeights: weightsAverage,
        nbrDays: nbrDaysPerMonth,
        nbrValues: nbrValuesPerMonth
    };
}

export const weightToCurrentWeekGraph = (weights) => {
    const currentWeekWeights = [];

    const currentDate = new Date();
    const currentDay = currentDate.getDay();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const beginWeekDate = new Date();
    beginWeekDate.setFullYear(currentYear);
    beginWeekDate.setMonth(currentMonth);
    beginWeekDate.setDate(currentDate.getDate() - currentDay);

    const filtered = weights.filter(weight => new Date(weight.date) > beginWeekDate);

    for (let i = 0; i < 7; i++) {
        if (weights.length > 0) {
            let added = false;
            if (currentDay > i) {
                for (let j = 0; j < filtered.length; j++) {
                    if (new Date(filtered[j].date).getDate() === beginWeekDate.getDate() + (i + 1)) {
                        added = true;
                        currentWeekWeights.push(filtered[j].weight);
                        break;
                    }
                }
                if (added) {
                    added = false;
                } else {
                    currentWeekWeights.push(null);
                }
            } else {
                currentWeekWeights.push(null);
            }
        } else {
            currentWeekWeights.push(null);
        }
    }

    return currentWeekWeights;
}

export const computeLastWeightComponent = (weights, goal, start) => {
    let weightsLength;
    if (Array.isArray(weights)) {
        weightsLength = weights.length;

        if (weightsLength > 0) {
            let weightComponentInfo;
            let index;
            let yesterday = false;

            if (isYesterday(weights[0].date)) {
                index = 0;
                yesterday = true;
            } else if (isToday(weights[0].date)) {
                if (weightsLength > 1 && isYesterday(weights[1].date)) {
                    index = 1;
                    yesterday = true;
                } else {
                    index = 1;
                }
            } else {
                return null;
            }

            let date = yesterday ? null : new Date(weights[index].date);
            let title = date ? `${date.getDate()} / ${`0${date.getMonth() + 1}`.slice(-2)} / ${date.getFullYear()}` : null;

            let weightDiff = 0;
            let weightBeforeLast = weights[index].weight;
            let loss;
            let positive;

            if (weightsLength > index + 1) {
                weightBeforeLast = weights[index + 1].weight;
                weightDiff = weightsDiff(weights[index].weight, weightBeforeLast);
                loss = weights[index].weight < weights[index + 1].weight;
                let diffBeforeLastWeight = weightsDiff(weights[index + 1].weight, goal);
                let diffLastWeight = weightsDiff(weights[index].weight, goal);
                positive = diffBeforeLastWeight > diffLastWeight;
            }


            weightComponentInfo = {
                title: yesterday ? "Yesterday" : title,
                weight: weights[index].weight,
                weightDiff: weightDiff,
                percentage: weightPercentage(goal, start, weights[index].weight),
                isPositive: positive,
                loss: loss
            };

            return weightComponentInfo;
        }
    }

    return null;
}

export const todayRecordedWeight = (weights, goal, start) => {
    let weightsLength;
    if (Array.isArray(weights)) {
        weightsLength = weights.length;

        if (weightsLength > 0) {
            let weightComponentInfo;
            let index;
            let today = false;

            if (isToday(weights[0].date)) {
                index = 0;
                today = true;
            } else {
                return null;
            }

            let weightDiff = 0;
            let weightBeforeLast = weights[index].weight;
            let loss;
            let positive;

            if (weightsLength > index + 1) {
                weightBeforeLast = weights[index + 1].weight;
                weightDiff = weightsDiff(weights[index].weight, weightBeforeLast);
                loss = weights[index].weight < weights[index + 1].weight;
                let diffBeforeLastWeight = weightsDiff(weights[index + 1].weight, goal);
                let diffLastWeight = weightsDiff(weights[index].weight, goal);
                positive = diffBeforeLastWeight > diffLastWeight;
            }

            weightComponentInfo = {
                title: today ? "Today" : null,
                weight: weights[index].weight,
                weightDiff: weightDiff,
                percentage: weightPercentage(goal, start, weights[index].weight),
                isPositive: positive,
                loss: loss
            };

            return weightComponentInfo;
        }
    }

    return null;
}

export const sortWeightPerDate = (weights) => {
    return weights.sort((a, b) => {
        if (new Date(a.date) > new Date(b.date)) {
            return -1;
        } else {
            return 1;
        }
    });
}
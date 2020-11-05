export const weightsDiff = (weight1, weight2) => {
    return Math.round(Math.abs(weight1 - weight2) * 100) / 100;
}

export const weightPercentage = (goal, start, current) => {
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
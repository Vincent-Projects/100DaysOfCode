export const weightsDiff = (weight1, weight2) => {
    return Math.round(Math.abs(weight1 - weight2) * 100) / 100;
}

export const weightPercentage = (goal, start, current) => {
    return 100 - ((current - goal) * 100) / (start - goal);
}
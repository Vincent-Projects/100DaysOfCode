// Take a list of workouts and return a list of number that is the sum of workouts done
// [for jan, for feb ...]
export const filterNumberWorkoutsPerMonth = (workouts) => {
    const nbrWorkouts = [];
    const nbrDaysPerMonth = [];

    if (workouts.length > 0) {
        const dateMonth = new Date();
        dateMonth.setFullYear(new Date(workouts[0].date).getFullYear());
        for (let i = 0; i < 12; i++) {
            dateMonth.setMonth(i);
            dateMonth.setDate(0);
            nbrDaysPerMonth.push(1);

            const monthI = workouts.filter(workout => {
                const date = new Date(workout.date);
                if (date.getMonth() === i && workout.done) {
                    return workout;
                }
            });
            if (monthI.length > 0) {
                nbrWorkouts.push(monthI.length);
            } else {
                nbrWorkouts.push(null);
            }
        }
    }



    return {
        nbrWorkouts: nbrWorkouts,
        nbrDaysPerMonth: nbrDaysPerMonth
    };
}

// The last at index 0
export const sortWorkoutsPerDate = (workouts) => {
    return workouts.sort((a, b) => {
        if (new Date(a.date) > new Date(b.date)) {
            return -1;
        } else {
            return 1;
        }
    });
}
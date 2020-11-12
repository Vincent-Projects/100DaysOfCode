export const isToday = (date) => {
    const today = new Date();
    const compareDate = new Date(date);

    if (Math.round((((today - compareDate) / 1000) / 3600) / 24) === 0) {
        return true;
    }

    return false
}

export const isYesterday = (date) => {
    const today = new Date(Date.now());
    const compareDate = new Date(date);

    if (today.getFullYear() === compareDate.getFullYear()
        && today.getMonth() === compareDate.getMonth()
        && today.getDate() - 1 === compareDate.getDate()) {
        return true;
    }

    return false
}
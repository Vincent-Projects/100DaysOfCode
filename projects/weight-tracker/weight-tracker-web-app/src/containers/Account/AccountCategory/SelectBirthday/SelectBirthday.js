import React from "react";

import classes from "./SelectBirthday.module.css";

const DAYS = [];
const MONTHS = [];
const YEARS = [];

const SelectBirthday = props => {
    DAYS.splice(0, DAYS.length);
    MONTHS.splice(0, MONTHS.length);
    YEARS.splice(0, YEARS.length);

    const currentDate = new Date(Date.now());

    for (let i = currentDate.getFullYear() - 100; i <= currentDate.getFullYear(); i++) {
        YEARS.push(i);
    }

    const nbrDays = new Date();
    nbrDays.setFullYear(props.selectedYear ? props.selectedYear : currentDate.getFullYear());
    nbrDays.setMonth(props.selectedMonth ? props.selectedMonth : currentDate.getMonth());
    nbrDays.setDate(0);

    for (let i = 1; i <= nbrDays.getDate(); i++) {
        DAYS.push(i);
    }

    const date = new Date();
    date.setFullYear(props.selectedYear ? props.selectedYear : currentDate.getFullYear());

    for (let i = 0; i < 12; i++) {
        date.setMonth(i);
        MONTHS.push(date.toLocaleString('default', { month: 'long' }));
    }

    const daysOptions = DAYS.map((value, index) => {
        return <option key={index} value={value}>{value}</option>
    });

    const monthsOptions = MONTHS.map((value, index) => {
        return <option key={index} value={index + 1}>{value}</option>
    });

    const yearsOptions = YEARS.map((value, index) => {
        return <option key={index} value={value}>{value}</option>
    });

    return (
        <div className={classes.Container}>
            <p className={classes.Title}>{props.title}</p>
            <select onChange={event => props.handleDayChange(event.target.value)} defaultValue={DAYS[props.selectedDay - 1]}>
                {daysOptions}
            </select>
            <select onChange={event => props.handleMonthChange(event.target.selectedIndex + 1)} defaultValue={props.selectedMonth}>
                {monthsOptions}
            </select>
            <select onChange={event => props.handleYearChange(event.target.value)} defaultValue={props.selectedYear}>
                {yearsOptions}
            </select>
        </div>
    )
}

export default SelectBirthday;
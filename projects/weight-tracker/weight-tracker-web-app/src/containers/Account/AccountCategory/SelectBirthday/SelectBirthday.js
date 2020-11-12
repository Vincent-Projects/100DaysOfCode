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
    console.log("NBR DAY " + nbrDays.getDate());

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
        return <option key={index} selected={value === props.selectedDate}>{value}</option>
    });

    const monthsOptions = MONTHS.map((value, index) => {
        return <option key={index} selected={index + 1 === props.selectedMonth}>{value}</option>
    });

    const yearsOptions = YEARS.map((value, index) => {
        return <option key={index} selected={value === props.selectedYear}>{value}</option>
    });

    return (
        <div className={classes.Container}>
            <p className={classes.Title}>{props.title}</p>
            <select onChange={event => props.handleDayChange(event.target.value)}>
                {daysOptions}
            </select>
            <select onChange={event => props.handleMonthChange(event.target.selectedIndex + 1)}>
                {monthsOptions}
            </select>
            <select onChange={event => props.handleYearChange(event.target.value)}>
                {yearsOptions}
            </select>
        </div>
    )
}

export default SelectBirthday;
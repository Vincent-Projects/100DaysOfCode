import React from "react";

import Form, { Input, Select } from '../../../components/Form';

import SelectBirthday from "./SelectBirthday/SelectBirthday";

import classes from "./AccountCategory.module.css";

const LANGUAGES = ["EN", "FR"];

class AccountCategory extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            email: "",
            gender: true,
            birthdayYear: null,
            birthdayMonth: null,
            birthdayDate: null,
            language: "",
            country: ""
        }
    }

    handleUsernameChange = (event) => {
        this.setState({
            username: event.target.value
        });
    }

    handleEmailChange = (event) => {
        this.setState({
            email: event.target.value
        });
    }

    handleGenderChange = (index) => {
        this.setState({
            gender: index === 1
        });
    }

    handleBirthdayYearChange = (year) => {
        this.setState({
            birthdayYear: year
        });
    }

    handleBirthdayMonthChange = (month) => {
        this.setState({
            birthdayMonth: month
        });
    }

    handleBirthdayDayChange = (date) => {
        this.setState({
            birthdayDate: date
        });
    }

    handleLanguageChange = (index) => {
        this.setState({
            language: LANGUAGES[index]
        });
    }

    handleSave = (event) => {
        event.preventDefault();
        const date = new Date(this.state.birthdayYear, this.state.birthdayMonth - 1, this.state.birthdayDate);
    }

    render() {
        return (
            <Form>
                <Input
                    title="Username"
                    type="text"
                    handleChange={this.handleUsernameChange}
                    value={this.state.username}
                    row={true}
                />
                <Input
                    title="Email"
                    type="text"
                    handleChange={this.handleEmailChange}
                    value={this.state.email}
                    row={true}
                />
                <Select
                    title="Gender"
                    values={["Female", "Male"]}
                    handleChange={this.handleGenderChange}
                />
                <SelectBirthday
                    title="Birthday"
                    selectedDay={this.state.birthdayDate}
                    selectedMonth={this.state.birthdayMonth}
                    selectedYear={this.state.birthdayYear}
                    handleYearChange={this.handleBirthdayYearChange}
                    handleMonthChange={this.handleBirthdayMonthChange}
                    handleDayChange={this.handleBirthdayDayChange}
                />
                <Select
                    title="Language"
                    values={LANGUAGES}
                    handleChange={this.handleLanguageChange}
                />
                <button onClick={this.handleSave}>Save</button>
            </Form>
        );
    }
}

export default AccountCategory;
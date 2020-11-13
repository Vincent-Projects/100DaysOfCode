import React from "react";

import Form, { Input, Select } from '../../../components/Form';

import SelectBirthday from "./SelectBirthday/SelectBirthday";

import LoadingSpiner from "../../../components/LoadingSpiner/LoadingSpiner";
import isLogged from "../../../hoc/isLogged";

import classes from "./AccountCategory.module.css";
import api from "../../../api";

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
            country: "",
            isLoading: false
        }
    }

    componentDidMount() {
        this.setState({
            isLoading: true,
        });

        const config = {
            headers: {
                Authorization: `Bearer ${this.props.token}`
            }
        };

        api.get('/user/info', config)
            .then(response => {
                if (response.status === 200 && response.data.success) {
                    const {
                        username,
                        email,
                        gender,
                        birthday,
                        language,
                        country
                    } = response.data.data;

                    let birthdayDate = null;

                    if (birthday) {
                        birthdayDate = new Date(birthday);
                    }

                    this.setState({
                        username: username,
                        email: email,
                        gender: gender,
                        birthdayDate: birthdayDate ? birthdayDate.getDate() - 1 : null,
                        birthdayMonth: birthdayDate ? birthdayDate.getMonth() + 1 : null,
                        birthdayYear: birthdayDate ? birthdayDate.getFullYear() : null,
                        language: language,
                        country: country,
                        isLoading: false
                    });
                }
            }).catch(err => {
                console.log(err);
            })
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
        const config = {
            headers: {
                Authorization: `Bearer ${this.props.token}`
            }
        };

        const date = new Date(this.state.birthdayYear, this.state.birthdayMonth, this.state.birthdayDate);

        this.setState({
            isLoading: true,
        });

        const data = {
            username: this.state.username,
            email: this.state.email,
            gender: this.state.gender,
            birthday: date,
            language: this.state.language,
            country: this.state.country
        };

        api.post('/user/info/update', data, config)
            .then(response => {
                if (response.status === 200 && response.data.success) {
                    this.setState({
                        isLoading: false
                    });
                }
            }).catch(err => {
                console.log(err);
            });
    }

    render() {
        if (this.state.isLoading) {
            return <LoadingSpiner />
        }
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
                    selectedValue={this.state.gender ? "Male" : "Female"}
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
                    selectedValue={this.state.language}
                />
                <button onClick={this.handleSave}>Save</button>
            </Form>
        );
    }
}

export default isLogged(AccountCategory);
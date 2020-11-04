import React, { Component } from 'react';
import { Route } from "react-router-dom";
import classes from './App.module.css';
import ToolBar from "./ToolBar/ToolBar";
import Dashboard from "./Dashboard/Dashboard";
import AuthContext from "../context/auth";
import axios from "axios";
import Login from "./Login/Login";
import Signup from "./Signup/Signup";
import WeightManager from "./WeightManager/WeightManager";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isAuth: false
        }
    }

    login = (email, password) => {
        axios.post('https://weightrack.herokuapp.com/v1/users/login', {
            email: email,
            password: password
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => {
            if (response.status === 200 && response.data.success) {
                localStorage.setItem("authToken", response.data.data.token);
                const expireDate = new Date();
                expireDate.setSeconds(expireDate.getSeconds() + response.data.data.expireIn);
                localStorage.setItem("authTokenExpireDate", expireDate);
                this.setState({
                    isAuth: true,
                });
            }
        });
    }

    logout = () => {
        localStorage.clear();
        this.setState({
            isAuth: false,
        });
    }

    signup = (username, email, password, confirmPassword) => {
        axios.post('https://weightrack.herokuapp.com/v1/users/signup', {
            username: username,
            email: email,
            password: password,
            confirmPassword: confirmPassword
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => {
            if (response.status === 200 && response.data.success) {
                // Add a redirect to login
            }
        });
    }

    componentDidMount() {

        const token = localStorage.getItem("authToken");
        const expireDate = localStorage.getItem("authTokenExpireDate");

        if (token && expireDate) {
            const expireDateFormat = new Date(expireDate);
            const currentDate = new Date();

            if (currentDate < expireDateFormat) {
                this.setState({
                    isAuth: true,
                });
            }
        }
    }

    render() {
        return (
            <AuthContext.Provider value={{
                isAuth: this.state.isAuth,
                login: this.login,
                logout: this.logout,
                signup: this.signup
            }}>
                <div className={classes.App}>
                    <ToolBar />
                    <div className={classes.ToolBarMargin}>
                        <Route
                            exact
                            path="/login"
                            component={Login}
                        />
                        <Route
                            exact
                            path="/signup"
                            component={Signup}
                        />
                        <Route
                            exact
                            path="/"
                            component={Dashboard}
                        />
                        <Route
                            path="/weight-manager"
                            component={WeightManager}
                        />
                    </div>
                </div>
            </AuthContext.Provider>
        );
    }
}


export default App;
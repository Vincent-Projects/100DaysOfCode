import React, { Component } from 'react';
import {
    Route,
    Switch,
    withRouter,
} from "react-router-dom";

import api from "../api";

import AuthContext from "../context/auth";
import WeightsContext from "../context/weights";

import ToolBar from "./ToolBar/ToolBar";
import Dashboard from "./Dashboard/Dashboard";
import WeightManager from "./WeightManager/WeightManager";
import WorkoutManager from "./WorkoutManager/WorkoutManager";
import Account from "./Account/Account";

import Login from "./Login/Login";
import Signup from "./Signup/Signup";

import classes from './App.module.css';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isAuth: false
        }
    }


    login = (email, password, callback) => {
        const data = { email, password };

        api.post('/auth/login', data)
            .then(response => {
                if (response.status === 200 && response.data.success) {
                    localStorage.setItem("authToken", response.data.data.token);
                    const expireDate = new Date();
                    expireDate.setSeconds(expireDate.getSeconds() + response.data.data.expireIn);
                    localStorage.setItem("authTokenExpireDate", expireDate);

                    callback(null, response.data, () => {
                        this.setState({
                            isAuth: true
                        })
                    });
                }
            }).catch((err) => {
                if (err.response) {
                    callback(err, err.response.data);
                }
            });
    }

    logout = () => {
        localStorage.clear();
        this.setState({
            isAuth: false,
        });
    }

    signup = (username, email, password, confirmPassword, callback) => {
        api.post('/auth/signup', {
            username: username,
            email: email,
            password: password,
            confirmPassword: confirmPassword
        }).then(response => {
            if (response.status === 201 && response.data.success) {
                this.props.history.replace('/login');
            }
        }).catch(err => {
            callback(err);
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
            } else {
                this.logout();
            }
        } else {
            this.logout();
        }
    }

    getYearWeights = () => {
        console.log("I fetch data from the api");
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
                        <Switch>
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
                                path="/workout-manager"
                                component={WorkoutManager}
                            />
                            <Route
                                path="/account"
                                component={Account}
                            />
                            <WeightsContext.Provider value={{
                                weights: [],
                                getYearWeights: this.getYearWeights
                            }}>
                                <Route
                                    path="/weight-manager"
                                    component={WeightManager}
                                />

                                <Route
                                    path="/"
                                    component={Dashboard}
                                />
                            </WeightsContext.Provider>
                        </Switch>
                    </div>
                </div>
            </AuthContext.Provider>
        );
    }
}


export default withRouter(App);
import React, { Component } from 'react';
import {
    Route,
    Switch,
    withRouter
} from "react-router-dom";
import axios from "axios";

import AuthContext from "../context/auth";

import ToolBar from "./ToolBar/ToolBar";
import Dashboard from "./Dashboard/Dashboard";
import WeightManager from "./WeightManager/WeightManager";

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

        axios.post('http://localhost:8080/auth/login', {
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
                    isAuth: true
                });
                callback(true);
            } else {
                callback(false);
            }
        }).catch(err => {
            callback(false);
        });
    }

    logout = () => {
        localStorage.clear();
        this.setState({
            isAuth: false,
        });
    }

    signup = (username, email, password, confirmPassword) => {
        axios.post('http://localhost:8080/auth/signup', {
            username: username,
            email: email,
            password: password,
            confirmPassword: confirmPassword
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => {
            if (response.status === 201 && response.data.success) {
                this.props.history.replace('/login');
            }
        }).catch(err => {
            console.log(this.props);
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
                // This means than there is a token but it has expire. Then make a clear on the token here
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
                                path="/weight-manager"
                                component={WeightManager}
                            />
                            <Route
                                path="/"
                                component={Dashboard}
                            />
                        </Switch>
                    </div>
                </div>
            </AuthContext.Provider>
        );
    }
}


export default withRouter(App);
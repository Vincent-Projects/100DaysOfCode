import React from "react";
import classes from "./Login.module.css";
import AuthContext from "../../context/auth";
import { Redirect } from "react-router-dom";
import Form, { Input, Title } from "../../components/Form";
import LoadingSpiner from "../../components/LoadingSpiner/LoadingSpiner";
import axios from 'axios';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            emailForm: "",
            passwordForm: "",
            emailFormError: null,
            passwordFormError: null,
            isLoading: false
        }
    }

    handleEmailChange = (event) => {
        this.setState({
            emailForm: event.target.value
        });
    }

    handlePasswordChange = (event) => {
        this.setState({
            passwordForm: event.target.value
        });
    }

    handleLogin = (event, login) => {
        event.preventDefault();

        const lowercaseEmail = this.state.emailForm.toLowerCase();

        login(lowercaseEmail, this.state.passwordForm, (success) => {
            if (!success) {
                this.setState({
                    isLoading: false,
                    emailFormError: "Please enter a valid email or password"
                });
            } else {
                this.setState({
                    isLoading: false,
                });
            }
            console.log("success");
        });
        this.setState({
            isLoading: true,
        });

    }

    render() {
        return (
            <AuthContext.Consumer>
                {context => {
                    if (context.isAuth) {
                        return <Redirect to="/" />
                    } else if (this.state.isLoading) {
                        return <LoadingSpiner />
                    } else {
                        return (
                            <Form>
                                <Title title="Welcome to WeighTrack" subTitle="Let's get fit !" />
                                {this.state.emailFormError ? <p className={classes.ErrorForm}>{this.state.emailFormError}</p> : null}
                                <Input
                                    title="Email"
                                    type="text"
                                    value={this.state.emailForm}
                                    handleChange={this.handleEmailChange}
                                />

                                <Input
                                    title="Password"
                                    type="password"
                                    value={this.state.passwordForm}
                                    handleChange={this.handlePasswordChange}
                                />

                                <div className={classes.LoginGroup}>
                                    <button className={classes.LoginBtn} onClick={(event) => this.handleLogin(event, context.login)}>Login</button>
                                </div>
                                <a href="#">reset password</a>
                            </Form>
                        );
                    }
                }}
            </AuthContext.Consumer>
        )
    }
}

export default Login;

/* axios.post('http://localhost:8080/auth/login', {
            email: lowercaseEmail,
            password: this.state.passwordForm
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                if (response.status === 200 && response.data.success) {
                    localStorage.setItem("authToken", response.data.data.token);
                    const expireDate = new Date();
                    expireDate.setSeconds(expireDate.getSeconds() + response.data.data.expireIn);
                    localStorage.setItem("authTokenExpireDate", expireDate);
                    this.setState({
                        isAuth: true,
                        isLoading: false,
                        emailFormError: null
                    });
                } else {
                    this.setState({
                        isLoading: false,
                        emailFormError: "Please enter a valid email or password"
                    });
                }
            }).catch(err => {
                this.setState({
                    isLoading: false,
                    emailFormError: "There was a problem with the server"
                });
            });
        this.setState({
            isLoading: true,
        });*/
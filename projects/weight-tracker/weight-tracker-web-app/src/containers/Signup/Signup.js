import React from "react";
import classes from "./Signup.module.css";
import AuthContext from "../../context/auth";
import { Redirect } from "react-router-dom";
import Form, { Input, Title } from "../../components/Form";
import LoadingSpiner from "../../components/LoadingSpiner/LoadingSpiner";
import { checkUsernameValidity } from "../../utils/form/inputCheck";

class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: {
                value: "",
                error: null,
                hasEnter: false,
            },
            emailForm: "",
            passwordForm: "",
            usernameForm: "",
            confirmForm: "",
            emailFormError: null,
            passwordFormError: null,
            usernameFormError: null,
            confirmFormError: null,
            isLoading: false
        }
    }

    handleEmailChange = (event) => {
        this.setState({
            emailForm: event.target.value
        });
    }

    handleUsernameChange = (event) => {
        this.setState({
            username: {
                value: event.target.value
            },
        });
    }

    handleUsernameFocusout = () => {
        checkUsernameValidity(this.state.username.value, (err) => {
            if (err) {
                this.setState({
                    username: {
                        error: err,
                        hasEnter: true,
                    }
                });
            }
        });
    }

    handleConfirmChange = (event) => {
        this.setState({
            confirmForm: event.target.value
        });
    }

    handlePasswordChange = (event) => {
        this.setState({
            passwordForm: event.target.value
        });
    }

    handleSignup = (event, signup) => {
        event.preventDefault();

        const lowercaseEmail = this.state.emailForm.toLowerCase();
        signup(this.state.username.value, lowercaseEmail, this.state.passwordForm, this.state.confirmForm, (err) => {
            if (err) {
                this.setState((prevState) => {
                    return {
                        isLoading: false,
                        username: {
                            value: prevState.username.value,
                            error: "Username already exists"
                        }
                    }
                })
            }
        });
        this.setState({
            isLoading: true
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
                                <Input
                                    title="Username"
                                    type="text"
                                    value={this.state.username.value}
                                    handleChange={this.handleUsernameChange}
                                    error={this.state.username.error}
                                    handleFocusout={this.handleUsernameFocusout}
                                />

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

                                <Input
                                    title="Confirm Password"
                                    type="password"
                                    value={this.state.confirmForm}
                                    handleChange={this.handleConfirmChange}
                                />

                                <div className={classes.Group}>
                                    <button className={classes.Btn} onClick={(event) => this.handleSignup(event, context.signup)}>Signup</button>
                                </div>
                            </Form>
                        );
                    }
                }}
            </AuthContext.Consumer>
        )
    }
}

export default Signup;
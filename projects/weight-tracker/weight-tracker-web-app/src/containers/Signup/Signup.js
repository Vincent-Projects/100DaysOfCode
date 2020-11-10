import React from "react";
import classes from "./Signup.module.css";
import AuthContext from "../../context/auth";
import { Redirect } from "react-router-dom";
import Form, { Input, Title } from "../../components/Form";
import LoadingSpiner from "../../components/LoadingSpiner/LoadingSpiner";

class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
            usernameForm: event.target.value
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
        signup(this.state.usernameForm, lowercaseEmail, this.state.passwordForm, this.state.confirmForm);
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
                                    value={this.state.usernameForm}
                                    handleChange={this.handleUsernameChange}
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
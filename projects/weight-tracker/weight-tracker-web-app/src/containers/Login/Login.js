import React from "react";
import classes from "./Login.module.css";
import AuthContext from "../../context/auth";
import { Redirect } from "react-router-dom";
import Form, { Input, Title } from "../../components/Form";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            emailForm: "",
            passwordForm: "",
            emailFormError: null,
            passwordFormError: null,
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

        login(lowercaseEmail, this.state.passwordForm);
    }

    render() {
        return (
            <AuthContext.Consumer>
                {context => {
                    if (context.isAuth) {
                        return <Redirect to="/" />
                    } else {
                        return (
                            <Form>
                                <Title title="Welcome to WeighTrack" subTitle="Let's get fit !" />
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
                            </Form>
                        );
                    }
                }}
            </AuthContext.Consumer>
        )
    }
}

export default Login;
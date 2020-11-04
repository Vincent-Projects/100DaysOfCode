import React from "react";
import classes from "./Login.module.css";
import AuthContext from "../../context/auth";
import { Redirect } from "react-router-dom";

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

        login(this.state.emailForm, this.state.passwordForm);
    }

    render() {
        return (
            <AuthContext.Consumer>
                {context => {
                    if (context.isAuth) {
                        return <Redirect to="/" />
                    } else {
                        return (
                            <form className={classes.LoginFormContainer}>
                                <div className={classes.LoginGroup}>
                                    <label className={classes.LoginLabel}>Email</label>
                                    <input className={classes.LoginInput} type="text" value={this.state.emailForm} onChange={this.handleEmailChange} />
                                </div>

                                <div className={classes.LoginGroup}>
                                    <label className={classes.LoginLabel}>Password</label>
                                    <input className={classes.LoginInput} type="password" value={this.state.passwordForm} onChange={this.handlePasswordChange} />
                                </div>

                                <div className={classes.LoginGroup}>
                                    <button className={classes.LoginBtn} onClick={(event) => this.handleLogin(event, context.login)}>Login</button>
                                </div>
                            </form>
                        );
                    }
                }}
            </AuthContext.Consumer>
        )
    }
}

export default Login;
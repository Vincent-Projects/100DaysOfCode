import React, { Component } from "react";
import {
    NavLink,
    Route,
    Switch
} from "react-router-dom"

import AccountCategory from "./AccountCategory/AccountCategory";
import PasswordCategory from "./PasswordCategory/PasswordCategory";
import NotificationsCategory from "./NotificationsCategory/NotificationsCategory";

import classes from "./Account.module.css";

import AuthContext from "../../context/auth";

class Account extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props.match.url)
        return (
            <AuthContext.Consumer>
                {context => {
                    if (context.isAuth) {
                        return (
                            <div className={classes.AccountContainer}>
                                <div className={classes.CategoryContainer}>
                                    <NavLink className={classes.Category} activeClassName={classes.Active} exact to={this.props.match.url}>
                                        <p>Account</p>
                                    </NavLink>
                                    <NavLink className={classes.Category} activeClassName={classes.Active} to={this.props.match.url + '/password'}>
                                        <p>Password</p>
                                    </NavLink>
                                    <NavLink className={classes.Category} activeClassName={classes.Active} to={this.props.match.url + '/notifications'}>
                                        <p>Notifications</p>
                                    </NavLink>
                                </div>
                                <div className={classes.OptionsContainer}>
                                    <Switch>

                                        <Route
                                            path={this.props.match.url + '/password'}
                                            component={PasswordCategory}
                                        />
                                        <Route
                                            path={this.props.match.url + '/notifications'}
                                            component={NotificationsCategory}
                                        />
                                        <Route
                                            exact
                                            path={this.props.match.url + '/'}
                                            component={AccountCategory}
                                        />
                                    </Switch>
                                </div>
                            </div>
                        );
                    }
                }}
            </AuthContext.Consumer>
        );
    }
}

export default Account;
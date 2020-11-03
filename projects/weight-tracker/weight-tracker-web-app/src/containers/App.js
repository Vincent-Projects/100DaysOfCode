import React, { Component } from 'react';
import classes from './App.module.css';

import ToolBar from "./ToolBar/ToolBar";

import { BrowserRouter, Route } from "react-router-dom";

import Dashboard from "./Dashboard/Dashboard";

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className={classes.App}>
                    <ToolBar />
                    <div className={classes.ToolBarMargin}>
                        <Route
                            exact
                            path="/"
                            component={Dashboard}
                        />
                        <Route
                            path="/weight-manager"
                            render={() => <h1>Weight Manager</h1>}
                        />
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}


export default App;
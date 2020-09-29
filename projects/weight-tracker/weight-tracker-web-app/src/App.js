import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';


import Login from './containers/auth/Login';

import classes from './App.module.css';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/signup">
                    <p>Signup</p>
                </Route>
                <Route path="/">
                    <p>Home</p>
                </Route>
            </Switch>
        </Router>
    )
};

export default App;
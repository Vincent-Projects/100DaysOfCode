import React, { useState } from 'react';

import classes from './App.module.css';
import TodoList from './containers/TodoList';
import Login from './containers/auth/Login';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    Link
} from 'react-router-dom';


const App = () => {
    const [todos, setTodos] = useState([{ _id: 1, done: false, task: "Clean the room" }]);
    const [token, setToken] = useState("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNyeXN5cm9vZHByb0BvdXRsb29rLmNvbSIsInVzZXJJZCI6IjVmNTYzYTZmOWM2MDEzMzRiYjY2MTQyYSIsImlhdCI6MTYwMTAzMDM1MywiZXhwIjoxNjAxMDMzOTUzfQ.wdmZOUROyS4aFOCjua4Pk8iVnWL22lyxYEVTZY1zb90");
    const [isLogged, setIsLogged] = useState(false);

    const auth = {
        authenticate(email, password) {
            fetch("http://localhost:8080/auth/login", {
                method: "POST",
                body: JSON.stringify({
                    email: email,
                    password: password
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    console.log(response);
                    return response.json()
                })
                .then(result => {
                    alert(result)
                    setToken(result.token);
                    setIsLogged(true);
                })
                .catch(err => {
                    console.log(err);
                })
        },
        signout() {
            setIsLogged(false);
            setToken("");
        }
    }

    let todoList = <TodoList isAuth={isLogged} todos={todos} token={token} />;

    if (!isLogged) {
        todoList = <Redirect
            to={{
                pathname: "/login",
            }}
        />;
    }

    return (
        <Router>
            <Switch>
                <Route path="/login">
                    <Login handleLogin={(email, password) => auth.authenticate(email, password)} />
                </Route>
                <Route exact path="/">
                    <div className={classes.AppContainer}>
                        {todoList}
                    </div>
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
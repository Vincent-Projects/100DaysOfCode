import React, { useState } from 'react';

import classes from './App.module.css';
import TodoList from './containers/TodoList';


const App = () => {
    const [todos, setTodos] = useState([{ _id: 1, done: false, task: "Clean the room" }]);
    const [token, setToken] = useState("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNyeXN5cm9vZHByb0BvdXRsb29rLmNvbSIsInVzZXJJZCI6IjVmNTYzYTZmOWM2MDEzMzRiYjY2MTQyYSIsImlhdCI6MTYwMDk2ODIzOSwiZXhwIjoxNjAwOTcxODM5fQ.prpHmDBSM8aWo7Da2VjOD7kQYJrf4R367yMNHdrQP_Y");

    return (
        <div className={classes.AppContainer}>
            <TodoList todos={todos} token={token} />
        </div>
    );
}

export default App;
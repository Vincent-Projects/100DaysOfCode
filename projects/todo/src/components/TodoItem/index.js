import React from 'react';

import classes from './TodoItem.module.css';


const TodoItem = props => {
    const done = props.done ? 'X' : 'O';

    return (
        <div className={classes.TodoItem}>
            <p className={classes.TodoItemCheck}>{done}</p>
            <p className={classes.TodoItemTask}>{props.task}</p>
        </div>
    )
}

export default TodoItem;
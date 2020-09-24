import React from 'react';

import classes from './TodoInput.module.css';

const TodoInput = props => {
    return (
        <div className={classes.TodoInputContainer}>
            <input className={classes.TodoInput} type="text" value={props.text} onChange={e => props.changeHandler(e.target.value)} />
            <button className={classes.SaveBtn} onClick={() => props.handleSave()}>Save</button>
        </div>
    )
}

export default TodoInput;
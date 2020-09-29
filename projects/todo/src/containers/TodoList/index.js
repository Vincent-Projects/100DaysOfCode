import React, { useState, useEffect } from 'react';

import {
    Redirect
} from "react-router-dom";

import classes from './TodoList.module.css';
import TodoItem from '../../components/TodoItem';
import TodoInput from '../../components/TodoInput';



const TodoList = (props) => {
    const [todos, setTodo] = useState([]);
    const [input, setInput] = useState('');

    useEffect(() => {

        const token = props.token;

        fetch('http://localhost:8080/todos', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(response => {
                setTodo(response.todos);
            }).catch(err => {
                console.log(err);
            })
    }, []);

    const changeTextHandler = text => {
        setInput(text);
    }

    const handleSave = () => {
        fetch("http://localhost:8080/todos/new", {
            method: "POST",
            body: JSON.stringify({
                task: input,
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${props.token}`
            }
        })
            .then(response => response.json())
            .then(response => {
                const oldTodo = todos;
                const updatedTodos = [
                    ...oldTodo,
                    response.todo
                ];
                setTodo(updatedTodos);
                setInput('');
            })
            .catch(err => {
                console.log(err);
            })
    }

    console.log(todos);
    const todosList = todos.map(todo => <TodoItem done={todo.done} task={todo.task} key={todo._id} />);

    return (
        <div className={classes.TodoListContainer}>
            <TodoInput
                changeHandler={changeTextHandler}
                text={input}
                handleSave={handleSave}
            />
            <div className={classes.TodoListItems}>
                {todosList.length > 0 ? todosList : "Enter new thing todo"}
            </div>
        </div>
    )
}

export default TodoList;
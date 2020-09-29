import React, { useState, useEffect } from 'react';
import {
    Redirect
} from 'react-router-dom';

import * as Constants from '../../../constants';
import classes from './Login.module.css';

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isAuth, setIsAuth] = useState(false);

    const handleLogin = (e) => {
        setIsLoading(true);
        fetch(`${Constants.API_URL}/users/login`, {
            method: "POST",
            body: JSON.stringify({
                email: email,
                password: password
            }),
            headers: {
                'Content-Type': Constants.JSON_HEADER,
            }
        })
            .then(response => response.json())
            .then(result => {
                setIsLoading(false);
                setIsAuth(true);
            }).catch(err => {
                console.log(err);
            })

        if (isAuth)
            return <Redirect to="/" />
    }

    return (
        <div className={classes.Container}>
            <div className={classes.MediaContainer}>
                <div className={classes.MediasContainer}>

                </div>
                <div className={classes.VersionningContainer}>
                    <p className={classes.VersionText}>v1.0.0</p>
                </div>
            </div>
            <div className={classes.LoginContainer}>
                <div className={classes.InputContainer}>
                    <input className={classes.Input} type="text" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div className={classes.InputContainer}>
                    <input className={classes.Input} type="password" value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <div className={classes.InputContainer}>
                    {isLoading ? <div>Loading...</div> : null}
                    <button className={classes.Button} onClick={handleLogin}>Let's get fit !</button>
                    <button className={classes.ResetPassword}>Forgot Password ? Click to reset</button>
                </div>
                <div className={classes.LinksContainer}>
                    <a className={classes.LinkActive} href="">Login</a>
                    <a className={classes.Link} href="">Signup</a>
                </div>
            </div>
        </div>
    );
}

export default Login;
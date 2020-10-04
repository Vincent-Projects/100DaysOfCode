import React, { useState, useEffect } from 'react';
import {
    Redirect
} from 'react-router-dom';
import { connect } from 'react-redux';



import * as actionTypes from '../../../redux/actionTypes';
import * as Constants from '../../../constants';
import classes from './Login.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';



const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();

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
                const expireDate = new Date(new Date().getTime() + result.data.expireIn * 1000);
                localStorage.setItem('token', result.data.token);
                localStorage.setItem('expireDate', expireDate);

                if (result.success) {
                    props.onLogin(result.data.token)
                }
                setIsLoading(false);
            }).catch(err => {
                console.log(err);
            })
    }

    return props.isLoggedIn ? <Redirect to="/" /> : (
        <div className={classes.Container}>
            <div className={classes.MediaContainer}>
                <div className={classes.MediasContainer}>
                    <h1 className={classes.MediaTitle}>Follow</h1>
                    <div className={classes.MediaIcon}>
                        <FontAwesomeIcon icon={faGithub} />
                        <p className={classes.MediaDescription}>Let's check all my work !</p>
                    </div>
                    <div className={classes.MediaIcon}>
                        <FontAwesomeIcon icon={faTwitter} />
                        <p className={classes.MediaDescription}>Follow me on my twitter account !</p>
                    </div>

                </div>
                <div className={classes.VersionningContainer}>
                    <p className={classes.VersionText}>v1.0.0</p>
                </div>
            </div>
            <form onSubmit={handleLogin} className={classes.LoginContainer}>
                <div className={classes.InputContainer}>
                    <input className={classes.Input} type="text" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div className={classes.InputContainer}>
                    <input className={classes.Input} type="password" value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <div className={classes.InputContainer}>
                    {isLoading ? <div>Loading...</div> : null}
                    <button className={classes.Button} type="submit">Let's get fit !</button>
                    <div className={classes.ResetContainer}>
                        <a href="" className={classes.ResetPassword}>Forgot Password ? Click to reset</a>
                    </div>
                </div>
                <div className={classes.LinksContainer}>
                    <a className={classes.LinkActive} href="">Login</a>
                    <a className={classes.Link} href="">Signup</a>
                </div>
            </form>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.isLoggedIn
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogin: token => dispatch({
            type: actionTypes.LOGIN,
            payload: {
                token: token
            }
        })
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);
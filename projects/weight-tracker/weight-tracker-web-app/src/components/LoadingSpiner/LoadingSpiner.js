import React from 'react';
import classes from "./LoadingSpiner.module.css";

const LoadingSpiner = props => {
    return (
        <div className={classes.SpinerContainer}>
            <div className={classes.Spiner}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    );
}

export default LoadingSpiner;
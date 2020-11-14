import React from "react";
import classes from "./CenteredErrorPage.module.css";

const CenteredErrorPage = props => {
    return <div className={classes.Container}>
        <p className={classes.ErrorMessage}>{props.errorMessage}</p>
    </div>
}

export default CenteredErrorPage;
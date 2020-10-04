import React from 'react';
import { connect } from 'react-redux';
import {
    Redirect
} from 'react-router-dom';

const Home = (props) => {
    console.log(props.isLoggedIn)

    return props.isLoggedIn ? (
        <p>Home</p>
    ) : <Redirect to="/login" />;
};

const mapStateToProps = state => {
    return {
        isLoggedIn: state.isLoggedIn
    };
}

export default connect(mapStateToProps)(Home);
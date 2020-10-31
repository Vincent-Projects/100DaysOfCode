import React from 'react';

class ErrorBoundary extends React.Component {
    state = {
        isError: false,
        errorMessage: "",
    };

    componentDidCatch = (error, info) => {
        this.setState({ isError: true, errorMessage: error });
    }

    render() {
        return this.state.isError ? (
            <h1>Something Went Wrong</h1>
        ) : this.props.children;
    }
}

export default ErrorBoundary;
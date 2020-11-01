import React from 'react';

const HeadBalance = (props) => {
    console.log("[HeadBalance.js] Render()");
    return (
        <div className="HeadBlance">
            <div>
                <h1 className="Title">Current Balance</h1>
                <p className="Amount">$ {props.amount}</p>
            </div>
        </div>
    );
}

export default React.memo(HeadBalance);
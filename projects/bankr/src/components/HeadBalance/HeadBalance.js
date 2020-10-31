import { useEffect } from 'react';

const HeadBalance = (props) => {
    useEffect(() => {
        console.log("[HeadBalance.js] useEffect");
    }, [props.amount]);
    return (
        <div className="HeadBlance">
            <div>
                <h1 className="Title">Current Balance</h1>
                <p className="Amount">$ {props.amount}</p>
            </div>
        </div>
    );
}

export default HeadBalance;
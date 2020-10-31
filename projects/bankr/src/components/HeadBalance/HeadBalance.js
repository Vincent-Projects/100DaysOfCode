const HeadBalance = (props) => {
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
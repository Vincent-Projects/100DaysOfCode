const ConfirmPanel = props => {
    const btnClassName = props.error ? "Input Error" : "Input";

    if (props.isActive) {

        return (
            <div className="ConfirmPanel" onClick={event => event.stopPropagation()}>
                <h1>Transaction</h1>
                <input className={btnClassName} type="number" value={props.newTrans} onChange={(event) => props.setNewTrans(event.target.value)} />
                <button className="Button Dark" onClick={props.confirmHandler}>Add</button>
            </div>
        );
    } else {
        return null;
    }
}

export default ConfirmPanel;
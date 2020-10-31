import Transactions from './Transactions/Transactions';

const BodyBalance = (props) => {
    return (
        <div className="BodyBalance">
            <Transactions
                transactions={props.transactions}
                deleteItem={props.deleteItem}
            />
            <div>
                <button className="Button" onClick={props.addHandler}>Add Transaction</button>
            </div>
        </div>
    );
}

export default BodyBalance;
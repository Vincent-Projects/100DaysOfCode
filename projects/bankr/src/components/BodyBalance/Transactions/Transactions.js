import List from './List/List';

const Transactions = (props) => {
    return (
        <div>
            <h1 className="Title">Recent Transactions</h1>
            <List transactions={props.transactions} deleteItem={props.deleteItem} />
        </div>
    );
}

export default Transactions;
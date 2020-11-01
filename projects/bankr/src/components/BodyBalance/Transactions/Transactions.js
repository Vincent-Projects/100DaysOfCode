import { useContext } from "react";
import List from './List/List';
import TransactionsContext from "../../../context/Transactions";

const Transactions = (props) => {
    const { transactions, deleteTransaction } = useContext(TransactionsContext);

    return (
        <div>
            <h1 className="Title">Recent Transactions</h1>
            <List transactions={transactions} deleteItem={deleteTransaction} />
        </div>
    );
}

export default Transactions;
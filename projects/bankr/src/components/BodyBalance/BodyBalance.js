import { useContext } from "react";
import Transactions from './Transactions/Transactions';
import TransactionsContext from '../../context/Transactions';

const BodyBalance = (props) => {
    const { addTransaction } = useContext(TransactionsContext);
    return (
        <div className="BodyBalance">
            <Transactions />
            <div>
                <button className="Button" onClick={addTransaction}>Add Transaction</button>
            </div>
        </div>
    );
}

export default BodyBalance;
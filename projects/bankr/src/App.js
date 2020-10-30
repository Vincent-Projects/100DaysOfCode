import { useState } from 'react';
import './App.css';
import List from './List/List';

function App() {
  const [amount, setAmount] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [newTrans, setNewTrans] = useState(0);
  const [confirmActive, setConfirmActive] = useState(false);
  const [error, setError] = useState(false);

  const confirmHandler = () => {
    if (newTrans === "" || newTrans === 0) {
      setError(true);
      return false;
    }
    let positive = true;

    if (newTrans.charAt(0) === "-") {
      positive = false;
    }

    const transFiltered = newTrans.replace("-", "");

    const transaction = {
      id: Math.floor(Math.random() * 10000),
      positive: positive,
      amount: Math.floor(transFiltered * 100) / 100
    };

    setTransactions([
      ...transactions,
      transaction
    ]);

    const newAmount = Math.floor((+amount + +newTrans) * 100) / 100;
    setAmount(newAmount);
    setNewTrans(0);

    const updatedConfirmActive = !confirmActive;
    setConfirmActive(updatedConfirmActive);

    setError(false);
  }

  const deleteTransactionHandler = (id) => {
    const filteredTransactions = transactions.filter(transaction => transaction.id !== id);
    setTransactions(filteredTransactions);

    const amountDelete = transactions.find(trans => trans.id === id);
    console.log(amountDelete);
    let newAmount;

    if (amountDelete.positive) {
      newAmount = amount - amountDelete.amount;
    } else {
      newAmount = amount + amountDelete.amount;
    }

    setAmount(newAmount);
  }

  const addTransactionHandler = () => {
    const updatedConfirmActive = !confirmActive;
    setConfirmActive(updatedConfirmActive);
  }

  const resetConfirmHandler = () => {
    if (confirmActive) {
      setConfirmActive(!confirmActive);
    }
  }

  const btnClassName = error ? "Input Error" : "Input";

  const confirmPanel = confirmActive ? <div className="ConfirmPanel" onClick={event => event.stopPropagation()}>
    <h1>Transaction</h1>
    <input className={btnClassName} type="number" value={newTrans} onChange={(event) => setNewTrans(event.target.value)} />
    <button className="Button Dark" onClick={confirmHandler}>Add</button>
  </div> : null;

  return (
    <div className="App" onClick={resetConfirmHandler}>
      {confirmPanel}
      <div className="HeadBlance">
        <div>
          <h1 className="Title">Current Balance</h1>
          <p className="Amount">$ {amount}</p>
        </div>
      </div>
      <div className="BodyBalance">
        <div>
          <h1 className="Title">Recent Transactions</h1>
          <List transactions={transactions} deleteItem={deleteTransactionHandler} />
        </div>
        <div>
          <button className="Button" onClick={addTransactionHandler}>Add Transaction</button>
        </div>
      </div>
    </div >
  );
}

export default App;

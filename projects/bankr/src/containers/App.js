import { useState } from 'react';
import './App.css';
import BodyBalance from '../components/BodyBalance/BodyBalance';
import ConfirmPanel from '../components/ConfirmPanel/ConfirmPanel';
import HeadBalance from '../components/HeadBalance/HeadBalance';

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

  return (
    <div className="App" onClick={resetConfirmHandler}>
      <ConfirmPanel
        error={error}
        newTrans={newTrans}
        confirmHandler={confirmHandler}
        setNewTrans={setNewTrans}
        isActive={confirmActive}
      />

      <HeadBalance
        amount={amount}
      />

      <BodyBalance
        transactions={transactions}
        deleteItem={deleteTransactionHandler}
        addHandler={addTransactionHandler}
      />
    </div >
  );
}

export default App;

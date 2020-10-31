import React from 'react';
import './App.css';
import BodyBalance from '../components/BodyBalance/BodyBalance';
import ConfirmPanel from '../components/ConfirmPanel/ConfirmPanel';
import HeadBalance from '../components/HeadBalance/HeadBalance';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 0,
      transactions: [],
      newTrans: 0,
      confirmActive: false,
      error: false
    };
  }

  confirmHandler = () => {
    if (this.state.newTrans === "" || this.state.newTrans === 0) {
      this.setState({ error: true });
      return false;
    }
    let positive = true;

    if (this.state.newTrans.charAt(0) === "-") {
      positive = false;
    }

    const transFiltered = this.state.newTrans.replace("-", "");

    const transaction = {
      id: Math.floor(Math.random() * 10000),
      positive: positive,
      amount: Math.floor(transFiltered * 100) / 100
    };

    const newAmount = Math.floor((+this.state.amount + +this.state.newTrans) * 100) / 100;


    const updatedConfirmActive = !this.state.confirmActive;

    this.setState({
      transactions: [
        ...this.state.transactions,
        transaction
      ],
      newTrans: 0,
      amount: newAmount,
      error: false,
      confirmActive: updatedConfirmActive
    });
  }

  deleteTransactionHandler = (id) => {
    const filteredTransactions = this.state.transactions.filter(transaction => transaction.id !== id);

    const amountDelete = this.state.transactions.find(trans => trans.id === id);
    let newAmount;

    if (amountDelete.positive) {
      newAmount = this.state.amount - amountDelete.amount;
    } else {
      newAmount = this.state.amount + amountDelete.amount;
    }

    this.setState({
      transactions: filteredTransactions,
      amount: newAmount
    });
  }

  addTransactionHandler = () => {
    const updatedConfirmActive = !this.state.confirmActive;
    this.setState({
      confirmActive: updatedConfirmActive
    });
  }

  resetConfirmHandler = () => {
    if (this.state.confirmActive) {
      this.setState({
        confirmActive: !this.state.confirmActive
      });
    }
  }

  render() {
    const filteredAmount = Math.floor((this.state.amount) * 100) / 100

    return (
      <div className="App" onClick={this.resetConfirmHandler} >
        <ConfirmPanel
          error={this.state.error}
          newTrans={this.state.newTrans}
          confirmHandler={this.confirmHandler}
          setNewTrans={(text) => this.setState({ newTrans: text })}
          isActive={this.state.confirmActive}
        />

        <HeadBalance
          amount={filteredAmount}
        />

        <BodyBalance
          transactions={this.state.transactions}
          deleteItem={this.deleteTransactionHandler}
          addHandler={this.addTransactionHandler}
        />
      </div >
    );
  }
}

export default App;

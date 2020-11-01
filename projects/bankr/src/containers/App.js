import React, { PureComponent } from 'react';
import './App.css';
import BodyBalance from '../components/BodyBalance/BodyBalance';
import ConfirmPanel from '../components/ConfirmPanel/ConfirmPanel';
import HeadBalance from '../components/HeadBalance/HeadBalance';
import TransactionsContext from '../context/Transactions';
import axios from 'axios';

class App extends PureComponent { // PureComponent is a normal component that use the shouldComponentUpdate() method to check if any of the props changed
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      amount: 0,
      transactions: [],
      newTrans: "",
      confirmActive: false,
      error: false
    };
  }

  static contextType = TransactionsContext;

  componentDidMount() {
    axios.get("https://jsonplaceholder.typicode.com/todos")
      .then(result => {
        if (result.status === 200) {
          this.setState({
            tasks: result.data
          });
        }
      }).catch(err => {
        console.log("error");
      })
  }

  confirmHandler = () => {
    if (this.state.newTrans === "" || this.state.newTrans === 0 || this.state.newTrans === null) {
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

    this.setState((prevState, props) => { // Use this form when the value of the futur state depends on the previous state
      return {
        transactions: [
          ...prevState.transactions,
          transaction
        ],
        newTrans: "",
        amount: newAmount,
        error: false,
        confirmActive: updatedConfirmActive
      }
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
      this.setState((prevState, props) => {
        return {
          confirmActive: !prevState.confirmActive
        }
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

        <TransactionsContext.Provider
          value={{
            transactions: this.state.transactions,
            addTransaction: this.addTransactionHandler,
            deleteTransaction: this.deleteTransactionHandler
          }}
        >
          <BodyBalance />
        </TransactionsContext.Provider>

        <div style={{
          display: "flex",
          flexDirection: "column",
          marginLeft: "5rem"
        }}>
          {
            this.state.tasks.map(task => {
              return <div
                key={task.id}
                style={{
                  display: 'flex',
                  flexDirection: "row",
                  color: "black",
                  marginTop: "1rem"
                }}>
                <input type="checkbox" checked={Boolean(task.completed)} onChange={() => console.log("Anyway")} />
                <p style={{ marginLeft: "1rem" }}>{task.title}</p>
              </div>
            })
          }
        </div>
      </div >
    );
  }
}

export default App;

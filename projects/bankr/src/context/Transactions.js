import React from 'react';

const transaction = React.createContext({
    transactions: [],
    addTransaction: () => { },
    deleteTransaction: () => { }

}); // React.createContext provide two object : Provider, Consumer

export default transaction;
import React, { useEffect } from "react";
import classes from './List.module.css';

function List(props) {
    useEffect(() => {
        console.log("I'm Here");
    }, [props.transactions]);

    console.log("I m also here");
    const items = props.transactions.map(item => <Item key={item.id} id={item.id} amount={item.amount} positive={item.positive} deleteItem={props.deleteItem} />);
    let itemsElements = items;

    if (items.length === 0) {
        itemsElements = <p>No Items Yet</p>
    }
    return <ul className={classes.List}>
        {itemsElements}
    </ul>
}

function Item({ id, amount, positive, deleteItem }) {
    return <li className={classes.Item}>
        {positive ? "+" : "-"} ${amount}
        <button onClick={() => deleteItem(id)}>delete</button>
    </li>
}

export default React.memo(List);
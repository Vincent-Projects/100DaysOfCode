import classes from './List.module.css';

function List(props) {
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

export default List;
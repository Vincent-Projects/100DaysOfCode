import React from 'react';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.module.css';

const Burger = (props) => {
    const ingredients = [];

    for (let ingredient in props.ingredients) {
        for (let i = 0; i < props.ingredients[ingredient]; i++) {
            ingredients.push(<BurgerIngredient key={ingredient + i} type={ingredient} />)
        }
    }

    return (
        <div className={classes.Centered}>
            <div className={classes.Burger}>
                <BurgerIngredient type="bread-top" />
                {ingredients.length > 0 ? ingredients : <p>Please select some ingredients</p>}
                <BurgerIngredient type="bread-bottom" />
            </div >
        </div>
    );
}

export default Burger;
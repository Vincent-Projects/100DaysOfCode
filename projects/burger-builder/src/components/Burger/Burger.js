import React from 'react';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.module.css';

const Burger = () => {
    return (
        <div className={classes.Centered}>
            <div className={classes.Burger}>
                <BurgerIngredient type="bread-top" />
                <BurgerIngredient type="salad" />
                <BurgerIngredient type="pickle" />
                <BurgerIngredient type="meat" />
                <BurgerIngredient type="cheese" />
                <BurgerIngredient type="bread-bottom" />
            </div >
        </div>
    );
}

export default Burger;
import React, { Component } from 'react';

import Burger from '../../components/Burger/Burger';
import Aux from '../../hoc/Aux';
import BuildControls from '../../components/Burger/BurgerIngredient/BuildControls/BuildControls';

const INGREDIENTS_PRICE = {
    salad: 0.5,
    meat: 1.5,
    pickle: 0.2,
    cheese: 0.8
};

class BurgerBuilder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredients: {
                salad: 0,
                cheese: 0,
                meat: 0,
                pickle: 0
            },
            totalPrice: 2
        }
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients,
            [type]: updatedCount
        };
        const ingredientPrice = INGREDIENTS_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + ingredientPrice;
        this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients,
            [type]: updatedCount
        };
        const ingredientPrice = INGREDIENTS_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - ingredientPrice;
        this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
    }

    render() {
        return <Aux>
            <Burger ingredients={this.state.ingredients} />
            <p>Price : {this.state.totalPrice}$</p>
            <BuildControls
                addHandler={this.addIngredientHandler}
                removeHandler={this.removeIngredientHandler}
            />
        </Aux>
    }
}

export default BurgerBuilder;
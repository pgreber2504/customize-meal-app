import React, { Component } from "react";
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Aux from '../../hoc/Aux';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    'salad': 0.2,
    'cheese': 0.5,
    'bacon': 0.7,
    'meat': 1.2
};

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0,
        },
        totalPrice: 4,
        purchaseable: false,
        orderCheckout: false,
    }


    addIngredientHandler = (type) => {
        const oldIngredient = this.state.ingredients[type];
        const updatedCount = oldIngredient + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;

        const currentIngredientPrice = INGREDIENT_PRICES[type];
        const currentTotalPrice = this.state.totalPrice;
        const calculatedPrice = currentTotalPrice + currentIngredientPrice;

        this.setState({
            ingredients: updatedIngredients, totalPrice: calculatedPrice
        })

        this.disableButtonHandler(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldIngredient = this.state.ingredients[type];
        if (oldIngredient <= 0) {
            return
        }
        const updatedCount = oldIngredient - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;

        const currentIngredientPrice = INGREDIENT_PRICES[type];
        const currentTotalPrice = this.state.totalPrice;
        const calculatedPrice = currentTotalPrice - currentIngredientPrice;

        this.setState({
            ingredients: updatedIngredients, totalPrice: calculatedPrice
        })

        this.disableButtonHandler(updatedIngredients)

    }

    disableButtonHandler(ingredients) {
        const copiedIngredients = ingredients

        const sum = Object.keys(copiedIngredients)
            .map(igKey => {
                return copiedIngredients[igKey]
            })
            .reduce((arr, el) => {
                return arr + el
            }, 0);

        this.setState({ purchaseable: sum > 0 })


    }

    checkoutHandler = () => {
        if(this.state.purchaseable !== true){
            return
        }
        this.setState({orderCheckout: true});
        

    }

    closeModalHandler = () => {
        this.setState({orderCheckout: false});
    } 
    
    continueHandler = () => {
        alert('CONTINUE')
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0

        }

        return (
            <Aux>
                <Modal disabled= {this.state.orderCheckout} closeModal= {this.closeModalHandler}>
                    <OrderSummary finalPrice= {this.state.totalPrice} ingredients= {this.state.ingredients} cancel= {this.closeModalHandler} continue= {this.continueHandler} />
                </Modal>
                <Burger
                    ingredients={this.state.ingredients} />
                <BuildControls
                    disableButton={disabledInfo}
                    disabledCheckout={this.state.purchaseable}
                    price={parseFloat(this.state.totalPrice).toFixed(2)}
                    added={this.addIngredientHandler}
                    remove={this.removeIngredientHandler}
                    checkout= {this.checkoutHandler} />
            </Aux>
        );
    }
}

export default BurgerBuilder;
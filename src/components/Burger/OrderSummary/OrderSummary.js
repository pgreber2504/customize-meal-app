import React from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientsSummary = Object.keys(props.ingredients)
        .map((igKey, i) => {
            return (
                <li key= {"list" + i}>
                    <span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {props.ingredients[igKey]}
                </li>
            )
        })
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>Burger with:</p>
            <ul>
                {ingredientsSummary}
            </ul>
            <h4>Price: {props.finalPrice.toFixed(2)}$</h4>
            <p>Go to Checkout?</p>
            <Button btnType= 'Success' clicked= {props.continue}>Yes</Button>
            <Button btnType= 'Danger' clicked= {props.cancel}>NO</Button>
        </Aux>
    )
}

export default orderSummary

import React from 'react';

import classes from './Order.css'

const order = (props) => {
    const ingredients = [];

    for (const ingredient in props.ingredients) {
        ingredients.push({
            name: ingredient,
            amount: props.ingredients[ingredient]
        })

    }

    const ingredientOutp = ingredients.map(ig => {
        return <span
            style={{ borderRadius: '30px', textAlign: 'center', textTransform: 'capitalize', display: 'inline-block', margin: '2px 8px', border: '1px solid #ccc', padding: '5px' }}
            key={ig.name}>{ig.name} ({ig.amount})</span>
    })

    return (
        <div className={classes.Order}>
            <p>Ingredients</p>
            {ingredientOutp}
            <p>Total Price: <strong>{props.price}$</strong></p>
        </div>
    )
}

export default order

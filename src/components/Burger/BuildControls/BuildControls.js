import React from 'react'
import BuildControl from './BuildControl/BuildControl'

import classes from './BuildControls.css';

const buildControls = (props) => {
    const label = [
        { label: 'Salad', type: 'salad' },
        { label: 'Bacon', type: 'bacon' },
        { label: 'Cheese', type: 'cheese' },
        { label: 'Meat', type: 'meat' },
    ];
    return (
        <div className={classes.BuildControls}>
            <p>Total Price: <strong>{props.price}$</strong></p>
            {label.map((ctrl, i) =>
                <BuildControl
                    key={i + 1}
                    label={ctrl.label}
                    disabledButton={props.disableButton[ctrl.type]}
                    added={() => props.added(ctrl.type)}
                    remove={() => props.remove(ctrl.type)} />)}
            <button
                onClick={props.checkout}
                disabled={!props.disabledCheckout}
                className={classes.Checkout}>
                    Checkout
            </button>
        </div>
    )
}

export default buildControls;
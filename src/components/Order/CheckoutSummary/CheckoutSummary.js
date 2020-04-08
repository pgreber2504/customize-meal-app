import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import { withRouter } from 'react-router-dom';
import classes from './CheckoutSummary.css';

const checkoutSummary = (props) => {

    
    return (
        <div className= {classes.CheckoutSummary}>
            <h1>Your ORDER:</h1>
            <div style= {{height: '300px' ,width: '100%' ,margin: 'auto'}}>
                <Burger ingredients={props.ingredients} />
            </div>
            <div style= {{marginTop: '100px'}}>
                <Button btnType='Danger' clicked= {props.checkoutCancel}>CANCEL</Button>
                <Button btnType='Success' clicked= {props.checkoutHandler}>CONTINUE</Button>
            </div>
        </div>
    )
}
const checkoutSummaryWithRouter = withRouter(checkoutSummary)

export default checkoutSummaryWithRouter

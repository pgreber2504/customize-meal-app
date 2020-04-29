import React from 'react';
import { Route, Redirect } from 'react-router';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';


const checkout = props => {
    const backButtonHandler = () => {
        props.history.goBack()
    }

    const checkoutHandler = () => {
        props.history.replace('/checkout/contact-data')
    }

    let checkoutSummary = <Redirect to="/" />;
    const redirect = props.purchased ? <Redirect to='/' /> : null;

    if (props.ingredients) {
        checkoutSummary = (
            <div>
                {redirect}
                <CheckoutSummary
                    checkoutCancel={backButtonHandler}
                    checkoutHandler={checkoutHandler}
                    ingredients={props.ingredients} />
                <Route path={props.match.path + '/contact-data'} component={ContactData} />
            </div>
        )
    }
    return checkoutSummary
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.bbr.ingredients,
        price: state.bbr.totalPrice,
        purchased: state.ord.purchased
    }
}

export default connect(mapStateToProps)(checkout);
import React, { Component } from 'react';
import { Route, Redirect } from 'react-router';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';


class Checkout extends Component {
    constructor(props){
        super(props);
        this.myRef = React.createRef()
    }

    backButtonHandler = () => {
        this.props.history.goBack()
    }

    checkoutHandler = () => {
        this.props.history.replace('/checkout/contact-data')
    }

    render() {
        let checkoutSummary = <Redirect to="/" />;
        const redirect = this.props.purchased ? <Redirect to='/' /> : null;

        if (this.props.ingredients) {
            checkoutSummary = (
                <div>
                    {redirect}
                    <CheckoutSummary
                        checkoutCancel={this.backButtonHandler}
                        checkoutHandler={this.checkoutHandler}
                        ingredients={this.props.ingredients} />
                    <Route path={this.props.match.path + '/contact-data'} component={ContactData} />
                </div>
            )
        }
        return checkoutSummary
    }
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.bbr.ingredients,
        price: state.bbr.totalPrice,
        purchased: state.ord.purchased
    }
}

export default connect(mapStateToProps)(Checkout);
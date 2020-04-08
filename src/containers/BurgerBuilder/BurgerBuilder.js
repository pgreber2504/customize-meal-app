import React, { Component } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Aux from '../../hoc/Aux/Aux';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actionCreators from '../../store/actions/index';




class BurgerBuilder extends Component {

    state = {
        orderCheckout: false,
        loader: false,

    }

    componentDidMount() {
        if (!this.props.ingredients) {
            this.props.fetchIngredientsFromServer()
        } else {
            return
        }
        this.props.purchaseInit();
        this.props.resetSignToOrder()

    }

    disableButtonHandler = (ingredients) => {
        const copiedIngredients = ingredients

        const sum = Object.keys(copiedIngredients)
            .map(igKey => {
                return copiedIngredients[igKey]
            })
            .reduce((arr, el) => {
                return arr + el
            }, 0);

        return sum > 0;
    }

    checkoutHandler = () => {
        if (this.props.isAuth) {
            this.setState({ orderCheckout: true });
        }else {
            this.props.signToOrder();
            this.props.history.push('/auth');
        }
    }

    closeModalHandler = () => {
        this.setState({ orderCheckout: false });
    }

    continueHandler = () => {

        const queryParams = [];

        for (let i in this.props.ing) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ing[i]));
        }
        queryParams.push('price=' + this.props.price)
        const queryString = queryParams.join('&');

        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });

    }

    render() {
        const disabledInfo = {
            ...this.props.ing
        }

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let loader = null;
        let burger = this.props.error ? <p style={{ textAlign: "center" }}>Something went wrong. <br /> Try Again later!</p> : <Spinner />
        if (this.props.ing) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ing} />
                    <BuildControls
                        disableButton={disabledInfo}
                        disabledCheckout={this.disableButtonHandler(this.props.ing)}
                        price={parseFloat(this.props.price).toFixed(2)}
                        added={this.props.addIngredientHandler}
                        remove={this.props.removeIngredientHandler}
                        checkout={this.checkoutHandler}
                        isAuth={this.props.isAuth} />
                </Aux>
            )

            loader = <OrderSummary
                finalPrice={this.props.price}
                ingredients={this.props.ing}
                cancel={this.closeModalHandler}
                continue={this.continueHandler} />;
        }

        if (this.state.loader) {
            loader = <Spinner />
        }

        return (
            <Aux>
                <Modal
                    disabled={this.state.orderCheckout}
                    closeModal={this.closeModalHandler}>
                    {loader}
                </Modal>
                {burger}
            </Aux>
        );
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addIngredientHandler: (type) => {
            dispatch(actionCreators.addIngredient(type))
        },
        removeIngredientHandler: (type) => {
            dispatch(actionCreators.removeIngredient(type))
        },
        fetchIngredientsFromServer: () => {
            dispatch(actionCreators.fetchIngredientsFromServer())
        },
        purchaseInit: () => {
            dispatch(actionCreators.purchaseInitializer())
        },
        signToOrder: () => {
            dispatch(actionCreators.signToOrder())
        },
        resetSignToOrder: () => {
            dispatch(actionCreators.resetSignToOrder())
        }
    }
}

const mapStateToProps = (state) => {
    return {
        ing: state.bbr.ingredients,
        price: state.bbr.totalPrice,
        error: state.bbr.error,
        purchased: state.ord.purchased,
        isAuth: state.auth.token !== null
    }
}

const BurgerBuilderWithRouter = withRouter(BurgerBuilder);
// const BurgerBuilderWithError = withError(BurgerBuilderWithRouter, axios)
export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilderWithRouter);
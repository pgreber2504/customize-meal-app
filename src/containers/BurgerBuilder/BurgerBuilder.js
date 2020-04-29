import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Aux from '../../hoc/Aux/Aux';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actionCreators from '../../store/actions/index';
import withError from "../../hoc/withError/withError";
import axios from "../../axios";

const burgerBuilder = (props) => {

    const [orderCheckout, setOrderCheckout] = useState(false);
    const [loader] = useState(false);

    const {fetchIngredientsFromServer, purchaseInit, resetSignToOrder} = props

    useEffect(() => {
        if (!props.ingredients) {
            fetchIngredientsFromServer()
        } else {
            return
        }
        purchaseInit();
        resetSignToOrder()
    }, [fetchIngredientsFromServer, purchaseInit, resetSignToOrder])

    const disableButtonHandler = (ingredients) => {
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

    const checkoutHandler = () => {
        if (props.isAuth) {
            setOrderCheckout(true);
        } else {
            props.signToOrder();
            props.history.push('/auth');
        }
    }

    const closeModalHandler = () => {
        setOrderCheckout(false);
    }

    const continueHandler = () => {

        const queryParams = [];

        for (let i in props.ing) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(props.ing[i]));
        }
        queryParams.push('price=' + props.price)
        const queryString = queryParams.join('&');

        props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });

    }

    const disabledInfo = {
        ...props.ing
    }

    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0
    }

    let continueLoader = null;
    let burger = props.error ? <p style={{ textAlign: "center" }}>Something went wrong. <br /> Try Again later!</p> : <Spinner />
    if (props.ing) {
        burger = (
            <Aux>
                <Burger ingredients={props.ing} />
                <BuildControls
                    disableButton={disabledInfo}
                    disabledCheckout={disableButtonHandler(props.ing)}
                    price={parseFloat(props.price).toFixed(2)}
                    added={props.addIngredientHandler}
                    remove={props.removeIngredientHandler}
                    checkout={checkoutHandler}
                    isAuth={props.isAuth} />
            </Aux>
        )

        continueLoader = <OrderSummary
            finalPrice={props.price}
            ingredients={props.ing}
            cancel={closeModalHandler}
            continue={continueHandler} />;
    }

    if (loader) {
        continueLoader = <Spinner />
    }

    return (
        <Aux>
            <Modal
                disabled={orderCheckout}
                closeModal={closeModalHandler}>
                {continueLoader}
            </Modal>
            {burger}
        </Aux>
    );
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

const burgerBuilderWithRouter = withRouter(burgerBuilder);
const burgerBuilderWithRouterAndWithErr = withError(burgerBuilderWithRouter, axios)

export default connect(mapStateToProps, mapDispatchToProps)(burgerBuilderWithRouterAndWithErr);
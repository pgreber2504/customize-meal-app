import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import { connect } from 'react-redux';
import { objectHelper, checkValidation } from '../../../shared/utility'
import * as actionCreators from '../../../store/actions/index';

const contactData = props => {
    const myRef = React.createRef();

    const [orderForm, setOrderForm] = useState({
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your Name',
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            changed: false
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Your E-Mail',
            },
            value: '',
            validation: {
                required: true,
                isEmail: true,
            },
            valid: false,
            changed: false

        },
        telephone: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Phone Number',
            },
            value: '',
            validation: {
                required: true,
                isNumber: true,
            },
            valid: false,
            changed: false


        },
        street: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Street',
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            changed: false


        },
        postCode: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'ZIP Code',
            },
            value: '',
            validation: {
                required: true,
                minLength: 5,
                maxLength: 5,
                isNumber: true,
            },
            valid: false,
            changed: false


        },
        country: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Country',
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            changed: false

        },
        deliveryMethod: {
            elementType: 'select',
            elementConfig: {
                options: [
                    { value: 'fastest', displayVal: 'Fastest' },
                    { value: 'standard', displayVal: 'Standard' },
                    { value: 'cheapest', displayVal: 'Cheapest' },
                ]
            },
            validation: {},
            value: 'fastest',
            valid: true,
        },
    })
    const [formValidity, setFormValidity] = useState(false);

    useEffect(() => {
        window.scrollTo(0, myRef.current.offsetTop)  
    }, [])

    const orderHandler = (e) => {
        e.preventDefault();
        const orderValues = {};

        for (let value in orderForm) {
            orderValues[value] = orderForm[value].value;
        }
        const orders = {
            ingredients: props.ingredients,
            price: props.price,
            customer: orderValues,
            userId: props.userId
        }

        props.fetchToServer(orders, props.token);
    }

    const formChangeHandler = (event, id) => {
        const copiedFormElement = objectHelper(orderForm[id], {
            value: event.target.value,
            valid: checkValidation(event.target.value, orderForm[id].validation),
            changed: true
        });

        const copiedOrderForm = objectHelper(orderForm, {
            [id]: copiedFormElement
        });

        let formValid = true;

        for (let key in copiedOrderForm) {
            formValid = copiedOrderForm[key].valid && formValid
        }

        setOrderForm(copiedOrderForm);
        setFormValidity(formValid)

    }

    const formArray = [];

    for (const key in orderForm) {
        formArray.push({
            id: key,
            config: orderForm[key],
        })
    }

    let checkoutForm = null;

    if (props.loader === true) {
        checkoutForm = <Spinner />
    } else {
        checkoutForm = (
            <React.Fragment>
                <h4>Enter your Contact Data</h4>
                <form onSubmit={orderHandler}>
                    {formArray.map(form => (
                        <Input
                            touched={form.config.changed}
                            invalid={form.config.valid}
                            shouldValidate={form.config.validation}
                            key={form.id}
                            changed={(event) => formChangeHandler(event, form.id)}
                            elementType={form.config.elementType}
                            elementConfig={form.config.elementConfig}
                            value={form.config.value} />
                    ))}
                    <Button
                        disabled={!formValidity}
                        btnType='Success'>ORDER</Button>
                </form>
            </React.Fragment>
        )

        return (
            <div ref={myRef} className={classes.ContactData}>
                {checkoutForm}
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchToServer: (orders, token) => {
            dispatch(actionCreators.fetchPurchase(orders, token))
        }
    }
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.bbr.ingredients,
        price: state.bbr.totalPrice,
        loader: state.ord.loader,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const contactDataWithRouter = withRouter(contactData)


export default connect(mapStateToProps, mapDispatchToProps)(contactDataWithRouter);
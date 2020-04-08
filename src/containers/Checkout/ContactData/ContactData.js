import React, { Component } from 'react';
import { withRouter } from 'react-router';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import { connect } from 'react-redux';
import { objectHelper, checkValidation } from '../../../shared/utility'
import * as actionCreators from '../../../store/actions/index';

class ContactData extends Component {
    constructor(props){
        super(props);
        this.myRef = React.createRef();
    }

    state = {
        orderForm: {
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
        },
        formValidity: false,
        loader: false
    }

    componentDidMount(){
        window.scrollTo(0,this.myRef.current.offsetTop)
    }

    orderHandler = (e) => {
        e.preventDefault();
        const orderValues = {};

        for (let value in this.state.orderForm) {
            orderValues[value] = this.state.orderForm[value].value;
        }
        const orders = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: orderValues,
            userId: this.props.userId
        }
        
        this.props.fetchToServer(orders, this.props.token);
    }

    formChangeHandler = (event, id) => {
        const copiedFormElement = objectHelper(this.state.orderForm[id], {
            value: event.target.value,
            valid: checkValidation(event.target.value, this.state.orderForm[id].validation),
            changed: true
        });

        const copiedOrderForm = objectHelper(this.state.orderForm, {
            [id]: copiedFormElement
        });

        let formValid = true;

        for (let key in copiedOrderForm) {
            formValid = copiedOrderForm[key].valid && formValid
        }

        this.setState({
            orderForm: copiedOrderForm,
            formValidity: formValid
        })
    }

    render() {
        const formArray = [];

        for (const key in this.state.orderForm) {
            formArray.push({
                id: key,
                config: this.state.orderForm[key],
            })
        }

        let checkoutForm = null;

        if (this.props.loader === true) {
            checkoutForm = <Spinner />
        } else {
            checkoutForm = (
                <React.Fragment>
                    <h4>Enter your Contact Data</h4>
                    <form onSubmit={this.orderHandler}>
                        {formArray.map(form => (
                            <Input
                                touched={form.config.changed}
                                invalid={form.config.valid}
                                shouldValidate={form.config.validation}
                                key={form.id}
                                changed={(event) => this.formChangeHandler(event, form.id)}
                                elementType={form.config.elementType}
                                elementConfig={form.config.elementConfig}
                                value={form.config.value} />
                        ))}
                        <Button
                            disabled={!this.state.formValidity}
                            btnType='Success'>ORDER</Button>
                    </form>
                </React.Fragment>
            )
        }


        return (
            <div ref={this.myRef} className={classes.ContactData}>
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

const ContactDataWithRouter = withRouter(ContactData)


export default connect(mapStateToProps, mapDispatchToProps)(ContactDataWithRouter);
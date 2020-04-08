import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import classes from './Auth.css';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';
import { objectHelper, checkValidation } from '../../shared/utility'
import * as actionCreators from '../../store/actions/index';



export class Auth extends Component {
    state = {
        control: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'E-mail',
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true,
                },
                valid: false,
                changed: false,
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password',
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6,
                    maxLength: 30,

                },
                valid: false,
                changed: false
            },
        },
        formValidity: false,
        signUp: false
    }

    switchForm = () => {
        this.setState(prevState => {
            return {
                signUp: !prevState.signUp
            };
        });
    };

    formChangeHandler = (event, id) => {
        const copiedFormElement = objectHelper(this.state.control[id], {
            value: event.target.value,
            valid: checkValidation(event.target.value, this.state.control[id].validation),
            changed: true,
        });

        const copiedOrderForm = objectHelper(this.state.control, {
            [id]: copiedFormElement
        });

        let formValid = true;

        for (let key in copiedOrderForm) {
            formValid = copiedOrderForm[key].valid && formValid;
        };

        this.setState({
            control: copiedOrderForm,
            formValidity: formValid,
        });
    };

    loginHandler = (event) => {
        const email = this.state.control.email.value;
        const password = this.state.control.password.value;

        this.props.authorize(email, password, this.state.signUp);
        
        event.preventDefault();
    }



    render() {
        const formArray = [];

        for (const key in this.state.control) {
            if (this.state.control.hasOwnProperty(key)) {
                formArray.push({
                    id: key,
                    config: this.state.control[key]
                });
            };
        };

        const form = formArray.map(element => (
            <Input
                key={element.id}
                touched={element.config.changed}
                invalid={element.config.valid}
                shouldValidate={element.config.validation}
                changed={(event) => this.formChangeHandler(event, element.id)}
                elementType={element.config.elementType}
                elementConfig={element.config.elementConfig}
                value={element.config.value}
            />
        ));

        let output = <Spinner />;
        let errorMessage = null;

        if(this.props.error){
            const message = this.props.error.message;
            const newMessage = message.replace(/_/g, ' ');
            errorMessage = <p style= {{padding: '10px 0', border: 'solid 1px red',color: 'red'}}>{newMessage}</p>
        };
        
        let redirect = null;

        if(this.props.isAuth && this.props.isSign){
            redirect = <Redirect to= '/checkout' />
        }else if(this.props.isAuth && !this.props.isSign){
            redirect = <Redirect to= '/' />
        };

        if (!this.props.loader) {
            output = (
                <React.Fragment>
                    {redirect}
                    <form onSubmit={(event) => this.loginHandler(event)}>
                        <h1>{!this.state.signUp ? 'Please Log in' : 'Please Sign up'}</h1>
                        {form}
                        <Button disabled={!this.state.formValidity} btnType='Success'>Submit</Button>
                    </form>
                    <Button clicked={this.switchForm} btnType='Danger'>{this.state.signUp ? 'LOG IN' : 'SIGN UP'  }</Button>
                </React.Fragment>
            );
        };

        return (
            <div className={classes.Auth}>
                {errorMessage}
                {output}
            </div>
        );
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        authorize: (email, password, method) => {
            dispatch(actionCreators.auth(email, password, method))
        }
    };
};

const mapStateToProps = (state) => {
    return {
        loader: state.auth.loader,
        error: state.auth.error,
        isAuth: state.auth.token !== null,
        isSign: state.ord.signToOrder,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
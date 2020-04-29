import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import classes from './Auth.css';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';
import { objectHelper, checkValidation } from '../../shared/utility'
import * as actionCreators from '../../store/actions/index';
import { Link } from 'react-router-dom';


const auth = props => {
    const controlInitialState = {
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'E-mail',
            },
            label: 'Enter your E-Mail:',
            value: '',
            validation: {
                required: true,
                isEmail: true,
            },
            valid: false,
            message: '',
            changed: false,
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Password',
            },
            label: 'Enter your Password:',
            value: '',
            validation: {
                required: true,
                minLength: 6,
                maxLength: 30,

            },
            valid: false,
            message: '',
            changed: false
        },
    };

    const [control, setControl] = useState(controlInitialState);
    const [formValidity, setFormValidity] = useState(false);

    

    const formChangeHandler = (event, id) => {
        const copiedFormElement = objectHelper(control[id], {
            value: event.target.value,
            valid: checkValidation(event.target.value, control[id].validation).isValid,
            message: checkValidation(event.target.value, control[id].validation).message,
            changed: true,
        });

        const copiedOrderForm = objectHelper(control, {
            [id]: copiedFormElement
        });

        let formValid = true;
        for (let key in copiedOrderForm) {
            formValid = copiedOrderForm[key].valid && formValid;
        };

        setControl(copiedOrderForm);
        setFormValidity(formValid);

    };

    const loginHandler = (event) => {
        const email = control.email.value;
        const password = control.password.value;

        props.authorize(email, password);

        event.preventDefault();
    }

    const formArray = [];
    for (const key in control) {
        if (control.hasOwnProperty(key)) {
            formArray.push({
                id: key,
                config: control[key]
            });
        };
    };

    const form = formArray.map(element => (
        <Input
            key={element.id}
            touched={element.config.changed}
            label={element.config.label}
            message={element.config.message}
            invalid={element.config.valid}
            shouldValidate={element.config.validation}
            changed={(event) => formChangeHandler(event, element.id)}
            elementType={element.config.elementType}
            elementConfig={element.config.elementConfig}
            value={element.config.value}
        />
    ));

    let output = <Spinner />;
    let errorMessage = null;
    if (props.error) {
        const message = props.error.message;
        const newMessage = message.replace(/_/g, ' ');
        errorMessage = <p style={{textAlign: 'center', padding: '10px 0', border: 'solid 1px red', color: 'red' }}>{props.error.code}: {newMessage}</p>
        setTimeout(()=>{
            errorMessage = null;
        }, 5000)
    };

    let redirect = null;
    if (props.isAuth && props.isSign) {
        redirect = <Redirect to='/checkout' />
    } else if (props.isAuth && !props.isSign) {
        redirect = <Redirect to='/' />
    };

    if (!props.loader) {
        output = (
            <React.Fragment>
                {redirect}
                <form onSubmit={(event) => loginHandler(event)}>
                    <h1>Please Log in</h1>
                    {form}
                    <Button disabled={!formValidity} btnType='Success'>Submit</Button>
                </form>
                <span>If you don't have account. Please <Link to='/register'>Register</Link></span>
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

export default connect(mapStateToProps, mapDispatchToProps)(auth);
import React, { useState } from 'react';
import { connect } from 'react-redux';

import classes from './Register.css';
import Button from '../../../components/UI/Button/Button';
import { objectHelper, checkValidation } from '../../../shared/utility';
import Input from '../../../components/UI/Input/Input';
import * as actionCreators from '../../../store/actions/index';
import Spinner from '../../../components/UI/Spinner/Spinner';

const register = (props) => {
    const [form, setForm] = useState({
        email: {
            elementType: 'input',
            label: 'Enter your E-Mail:',
            elementConfig: {
                type: 'email',
                placeholder: '',
            },
            value: '',
            validation: {
                required: true,
                isEmail: true,
            },
            valid: false,
            message: '',
            changed: false,
        },
        confirmEmail: {
            elementType: 'input',
            label: 'Confirm your E-Mail:',
            elementConfig: {
                type: 'email',
                placeholder: '',
            },
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
            label: 'Enter your Password:',
            elementConfig: {
                type: 'password',
                placeholder: 'min. 6 characters',
            },
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
        confirmPassword: {
            elementType: 'input',
            label: 'Confirm your Password:',
            elementConfig: {
                type: 'password',
                placeholder: 'min. 6 characters',
            },
            value: '',
            validation: {
                required: true,
            },
            valid: false,
            message: '',
            changed: false,
        },
        acceptPolicy: {
            elementType: 'checkbox',
            elementConfig: {
                type: 'checkbox',
            },
            value: 'Do You accept our Policy Terms ?',
            checked: false,
            valid: false,
        }
    })
    const [formValidity, setFormValidity] = useState(false);
    const [error, setError] = useState(null)

    

    const formChangedHandler = (event, id) => {
        const newElement = objectHelper(form[id], {
            value: event.target.value,
            valid: checkValidation(event.target.value, form[id].validation).isValid,
            message: checkValidation(event.target.value, form[id].validation).message,
            changed: true,
        });

        const newArr = objectHelper(form, {
            [id]: newElement,
        });

        let formValid = true;
        for (const key in newArr) {
            formValid = form[key].valid && formValid;
        }

        setForm(newArr);
        setFormValidity(formValid)
    }

    const clickHandler = (event, id) => {
        const newElement = objectHelper(form[id], {
            checked: event.target.checked,
            valid: event.target.checked,
        })

        const newArr = objectHelper(form, {
            [id]: newElement,
        });

        let formValid = true;
        for (const key in newArr) {
            formValid = form[key].valid && formValid;
        }
        
        setForm(newArr);
        setFormValidity(!formValid)
    }

    let header = <h1>Create Account</h1>;

    if (error) {
        header = <h1 style={{ color: 'red', border: '1px solid red' }}>{error}</h1>
    };

    const registerHandler = event => {
        const email = form.email.value;
        const password = form.password.value;
        const confirmPassword = form.confirmPassword.value;
        const confirmEmail = form.confirmEmail.value;
        
        if (email !== confirmEmail || password !== confirmPassword || !form.acceptPolicy.checked) {
            let emailIsValid = true;
            let passwordIsValid = true;

            emailIsValid = email === confirmEmail;
            passwordIsValid = password === confirmPassword;

            if (!form.acceptPolicy.checked) {
                setError('You must accept our policy terms to continue');
            }else{
                setError(null)
            };

            setForm({
                ...form,
                confirmEmail: {
                    ...form.confirmEmail,
                    valid: emailIsValid,
                    message: emailIsValid ? '' : 'You entered different email'
                },
                confirmPassword: {
                    ...form.confirmPassword,
                    valid: passwordIsValid,
                    message: passwordIsValid ? '' : 'You entered different password'
                },
            });

            setFormValidity(false);

        } else {
            props.registerUser(email, password);

            const newForm = objectHelper(form, {
                acceptPolicy: {
                    ...form.acceptPolicy,
                    checked: false,
                    valid: false,
                },
            })
            setForm(newForm);
            setFormValidity(false);
        }
        event.preventDefault()
    }

    const formArray = [];

    for (let key in form) {
        formArray.push({
            id: key,
            config: form[key]
        })
    }

    let formInput = formArray.map(element => (
        <Input
            key={element.id}
            label={element.config.label}
            message={element.config.message}
            value={element.config.value}
            checked={(event) => clickHandler(event, element.id)}
            touched={element.config.changed}
            placeholder={element.config.elementConfig}
            elementType={element.config.elementType}
            elementConfig={element.config.elementConfig}
            changed={(event) => formChangedHandler(event, element.id)}
            invalid={element.config.valid}
            shouldValidate={element.config.validation}
        />
    ))

    let output = <Spinner />
    let errorOutput = null;

    if(props.error){
        const message = props.error.message;
        const newMessage = message.replace(/_/g, ' ');
        errorOutput = <p style={{textAlign: 'center', padding: '10px 0', border: 'solid 1px red', color: 'red' }}>{props.error.code}: {newMessage}</p>
    }

    if (!props.loader) {
        output = (
            <form onSubmit={(event) => registerHandler(event)}>
                {header}
                {formInput}
                <Button disabled={!formValidity} btnType='Success'>Create Account</Button>
            </form>
        )
    }

    return (
        <div className={classes.Register}>
            {errorOutput}
            {output}
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        registerUser: (email, password) => {
            dispatch(actionCreators.registerUser(email, password))
        }
    }
}

const mapStateToProps = (state) => {
    return {
        loader: state.auth.loader,
        error: state.auth.registerError
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(register);
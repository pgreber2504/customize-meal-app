import React from 'react';
import Button from '../../UI/Button/Button'

const LoginMessage = (props) => (
        <React.Fragment>
            <h2>Hello {props.name}</h2>
            <p>You are successfully loged in.</p>
            <Button btnType="Success" clicked={props.continue}>Continue</Button>
        </React.Fragment>
)

export default LoginMessage

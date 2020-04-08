import React from 'react'
import classes from './Modal.css';

import Backdrop from '../Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/Aux';

const modal = (props) => (
    <Aux>
        <Backdrop disabled= {props.disabled} close= {props.closeModal} />
        <div
            className={classes.Modal}
            style={{
                transform: props.disabled ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.disabled ? '1' : '0'
            }} >
            {props.children}
        </div>
    </Aux>

)

export default modal;

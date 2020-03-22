import React from 'react';

import classes from './Logo.css'
import appLogo from '../../../assets/images/logo.png'

const logo = (props) => (
        <div className= {classes.Logo} style={{height: props.height}}>
           <img src={appLogo} alt='logo' /> 
        </div>
    
)

export default logo

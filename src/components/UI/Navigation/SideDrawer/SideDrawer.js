import React from 'react';
import classes from './SideDrawer.css'

import Backdrop from '../../Backdrop/Backdrop';
import Aux from '../../../../hoc/Aux/Aux';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

const sideDrawer = (props) => {
    return (
        <Aux>
            <Backdrop disabled= {props.info} close= {props.disableBackdrop} />
            <div className={[classes.SideDrawer, props.info? classes.Open: classes.Closed].join(' ')}>
                <div className= {classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
    
            </div>
        </Aux>
    )
}

export default sideDrawer

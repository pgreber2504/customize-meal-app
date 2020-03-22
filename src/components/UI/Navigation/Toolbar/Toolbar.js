import React from 'react';

import NavigationItems from '../NavigationItems/NavigationItems'
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <div onClick= {props.showSideDrawer} className= {[classes.Menu, classes.MobileOnly].join(' ')}>
            <p>MENU</p>
        </div>
        <div className={classes.Logo}>
            <Logo />
        </div>

        <div className= {classes.DesktopOnly}>
            <NavigationItems />
        </div>        
        </header>
)

export default toolbar

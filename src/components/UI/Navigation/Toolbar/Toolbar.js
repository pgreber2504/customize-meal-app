import React from 'react';
import PropTypes from 'prop-types';
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
            <NavigationItems isAuth= {props.isAuth} />
        </div>        
        </header>
)

toolbar.propTypes = {
    showSideDrawer: PropTypes.func.isRequired,
}

export default toolbar

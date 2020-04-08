import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem click= {props.click} link='/' exact>Burger Builder</NavigationItem>
        {props.isAuth ? <NavigationItem click= {props.click} link='/orders'>My Orders</NavigationItem> : null }
        {props.isAuth ? <NavigationItem click= {props.click} link= '/logout'>Log Out</NavigationItem> : <NavigationItem click= {props.click} link='/auth'>Log In</NavigationItem>}
    </ul>
)
  
export default navigationItems

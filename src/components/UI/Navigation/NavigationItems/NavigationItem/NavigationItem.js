import React from 'react';
import PropTypes from 'prop-types';

import classes from './NavigationItem.css'

const navigationItem = (props) => (
    <li className= {classes.NavigationItem}>
        <a href= {props.link} className={props.active? classes.active: null}>
            {props.children}
        </a>
    </li>
)

navigationItem.defaultProps = {
    active: PropTypes.bool.isRequired
}

export default navigationItem

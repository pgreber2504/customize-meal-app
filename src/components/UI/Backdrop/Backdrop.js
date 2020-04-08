import React from 'react';
import PropTypes from 'prop-types';
import classes from './Backdrop.css';

const backdrop = (props) => (
    props.disabled ? <div className={classes.Backdrop} onClick= {props.close}></div> : null
);

backdrop.propTypes = {
    close: PropTypes.func.isRequired
}
export default backdrop

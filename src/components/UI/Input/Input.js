import React from 'react';

import classes from './Input.css'

const input = (props) => {
    let inputElement = null;
    const classesArray = [classes.InputElement];

    if (!props.invalid && props.shouldValidate && props.touched) {
        classesArray.push(classes.Invalid)
    }

    switch (props.elementType) {
        case ('input'):
            inputElement = <input
                className={classesArray.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ('textarea'):
            inputElement = <textarea
                className={classesArray.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ('select'):
            inputElement = <select
                className={classesArray.join(' ')}
                value={props.value}
                onChange={props.changed}>
                {props.elementConfig.options.map(element => (
                    <option key={element.value} value={element.value}>{element.displayVal}</option>
                ))}
            </select>;
            break;
        case ('checkbox'):
            inputElement = (
                <label style={{ color: '#6c757d' }}>
                    <input onClick={props.checked} style={{ width: '16px', height: '16px' }} type='checkbox' />
                    {props.value}
                </label>
            );
            break;
        default:
            inputElement = inputElement = <input
                className={classesArray.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;

            break;
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
            <span className={classes.Message}>{props.message}</span>
        </div>
    )
}

export default input;
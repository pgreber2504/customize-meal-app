import React from 'react';

import classes from './Input.css'

const input = (props) => {
    let inputElement = null;
    const classesArray = [classes.InputElement];

    if(!props.invalid && props.shouldValidate && props.touched){
        classesArray.push(classes.Invalid)
    }

    switch (props.elementType) {
        case ('input'):
            inputElement = <input
                className={classesArray.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange= {props.changed} />;
            break;
        case ('textarea'):
            inputElement = <textarea
                className={classesArray.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange= {props.changed} />;
            break;
        case ('select'):
            inputElement = inputElement = <select
                className={classesArray.join(' ')}
                value={props.value}
                onChange= {props.changed}>
                {props.elementConfig.options.map(element => (
                    <option key= {element.value} value={element.value}>{element.displayVal}</option>
                ))}
            </select>;
            break;
        default:
            inputElement = inputElement = <input
                className={classesArray.join(' ')}
                {...props.elementConfig}
                value={props.value} 
                onChange= {props.changed}/>;

            break;
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Input}>{props.label}</label>
            {inputElement}
        </div>
    )
}

export default input;
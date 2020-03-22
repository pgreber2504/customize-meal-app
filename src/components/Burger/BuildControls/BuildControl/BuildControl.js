import React from 'react'
import classes from './BuildControl.css'

const buildControl = ( props ) => {
    return (
        <div className= {classes.BuildControl}>
            <div className= {classes.Label}>{props.label}</div>
            <button onClick= {props.added} className= {classes.More}>More</button>
            <button disabled= {props.disabledButton} onClick= {props.remove} className= {classes.Less}>Less</button>
        </div>
    )
}

export default buildControl

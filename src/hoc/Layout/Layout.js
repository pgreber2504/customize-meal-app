import React, { useState } from 'react';
import { connect } from 'react-redux';

import classes from './Layout.css';
import SideDrawer from '../../components/UI/Navigation/SideDrawer/SideDrawer'
import Toolbar from '../../components/UI/Navigation/Toolbar/Toolbar'
import Aux from '../Aux/Aux';

const layout = props => {
    const [clicked, setClicked] = useState(false)

    const disableBackdropHandler = () => {
        setClicked(false);
    }

    const enableSideDrawerHandler = () => {
        setClicked(true);
    }


    return (
        <Aux>
            <SideDrawer isAuth={props.isAuthenticated} info={clicked} disableBackdrop={disableBackdropHandler} />
            <Toolbar isAuth={props.isAuthenticated} showSideDrawer={enableSideDrawerHandler} />
            <main className={classes.Content}>
                {props.children}
            </main>
        </Aux>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        isAuthenticated: state.auth.token !== null,
    }
}

export default connect(mapStateToProps)(layout)

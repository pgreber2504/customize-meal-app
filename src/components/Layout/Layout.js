import React, { Component } from 'react';

import classes from './Layout.css';

import SideDrawer from '../UI/Navigation/SideDrawer/SideDrawer'
import Toolbar from '../UI/Navigation/Toolbar/Toolbar'
import Aux from '../../hoc/Aux';

class Layout extends Component {
    state= {
        clicked: false,
    }

    disableBackdropHandler = () => {
        this.setState({clicked: false})
    }

    enableSideDrawerHandler = () => {
        this.setState({clicked: true});
    }



    render() {
        return (
            <Aux>
                <SideDrawer info= {this.state.clicked} disableBackdrop= {this.disableBackdropHandler} />
                <Toolbar showSideDrawer= {this.enableSideDrawerHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

export default Layout

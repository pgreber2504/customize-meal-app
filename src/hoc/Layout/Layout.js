import React, { Component } from 'react';

import classes from './Layout.css';

import SideDrawer from '../../components/UI/Navigation/SideDrawer/SideDrawer'
import Toolbar from '../../components/UI/Navigation/Toolbar/Toolbar'
import Aux from '../Aux/Aux';
import { connect } from 'react-redux';

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
                <SideDrawer isAuth= {this.props.isAuthenticated} info= {this.state.clicked} disableBackdrop= {this.disableBackdropHandler} />
                <Toolbar isAuth= {this.props.isAuthenticated} showSideDrawer= {this.enableSideDrawerHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        isAuthenticated: state.auth.token !== null,
    }
}

export default connect(mapStateToProps)(Layout)

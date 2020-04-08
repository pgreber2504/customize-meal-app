import React, { Component } from 'react'
import * as actionCreators from '../../../store/actions/index'
import { Redirect } from 'react-router'
import { connect } from 'react-redux'

export class Logout extends Component {
    componentDidMount(){
        this.props.logout()
    }

    render() {
        return <Redirect to= '/' />
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => {
            dispatch(actionCreators.authLogout())
        }
    }
}

export default connect(null, mapDispatchToProps)(Logout)

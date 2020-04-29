import React, { useEffect } from 'react';

import * as actionCreators from '../../../store/actions/index';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';

const logout = props => {
    const { logout } = props;

    useEffect(() => {
        logout()
    }, [logout]);

    return <Redirect to='/' />
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => {
            dispatch(actionCreators.authLogout())
        }
    }
}

export default connect(null, mapDispatchToProps)(logout)

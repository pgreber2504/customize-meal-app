import React, { useEffect } from 'react';
import { connect } from 'react-redux';


import Order from '../../components/Order/Order';
import * as actionCreators from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

const orders = props => {
    const {userId, token, fetchOrdersFromServer} = props;

    useEffect(() => {
        fetchOrdersFromServer(token, userId);
    }, [fetchOrdersFromServer, token, userId])

    let orders = <Spinner />

    if (!props.loading) {
        orders = props.orders.map(orders => (
            <Order
                key={orders.id}
                price={orders.price.toFixed(2)}
                ingredients={orders.ingredients} />
        ))
    }

    return orders;

}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchOrdersFromServer: (token, userId) => {
            dispatch(actionCreators.fetchOrdersFromServer(token, userId))
        }
    }
};

const mapStateToProps = (state) => {
    return {
        orders: state.ord.orders,
        loading: state.ord.loader,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(orders);
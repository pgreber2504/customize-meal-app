import React, { Component } from 'react';
import { connect } from 'react-redux';


import Order from '../../components/Order/Order';
import * as actionCreators from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {

    componentDidMount() {
        this.props.fetchOrdersFromServer(this.props.token, this.props.userId);
    }

    render() {
        let orders = <Spinner />

        if(!this.props.loading){
            orders = this.props.orders.map(orders => (
                <Order
                    key={orders.id}
                    price={orders.price.toFixed(2)}
                    ingredients= {orders.ingredients} />
            ))
        }

        return orders;
    }
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


export default connect(mapStateToProps, mapDispatchToProps)(Orders);
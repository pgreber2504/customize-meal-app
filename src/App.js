import React, { Component } from 'react';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Layout from './hoc/Layout/Layout';
import Logout from './containers/Auth/Logout/Logout';
import * as actionCreators from './store/actions/index';
import asyncComp from './hoc/asyncComp/asyncComp';

const ordersLazy = asyncComp(() => {
  return import('./containers/Orders/Orders')
});

const authLazy = asyncComp(() => {
  return import('./containers/Auth/Auth')
});

const checkoutLazy = asyncComp(() => {
  return import('./containers/Checkout/Checkout')
});

class App extends Component {
  componentDidMount() {
    this.props.autoAuth();
  }


  render() {
    let route = (
      <Switch>
        <Route exact path='/' component={BurgerBuilder} />
        <Route path='/auth' component={authLazy} />
        <Redirect to='/' />
      </Switch>
    )
    if (this.props.isAuth) {
      route = (
        <Switch>
          <Route exact path='/' component={BurgerBuilder} />
          <Route path='/logout' component={Logout} />
          <Route path='/auth' component={authLazy} />
          <Route path='/orders' component={ordersLazy} />
          <Route path='/checkout' component={checkoutLazy} />
          <Redirect to='/' />
        </Switch>
      )
    }



    return (
      <BrowserRouter>
        <Layout>
          {route}
        </Layout>
      </BrowserRouter>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    autoAuth: () => {
      dispatch(actionCreators.autoAuth())
    }
  }
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.token !== null,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

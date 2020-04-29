import React, { useEffect, Suspense } from 'react';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Spinner from './components/UI/Spinner/Spinner'
import Layout from './hoc/Layout/Layout';
import Logout from './containers/Auth/Logout/Logout';
import * as actionCreators from './store/actions/index';


const Orders = React.lazy(() => {
  return import('./containers/Orders/Orders')
});

const Auth = React.lazy(() => {
  return import('./containers/Auth/Auth')
});

const Checkout = React.lazy(() => {
  return import('./containers/Checkout/Checkout')
});

const Register = React.lazy(() => {
  return import('./containers/Auth/Register/Register')
})

const App = props => {
  
  useEffect(() => {
    props.autoAuth();
  }, [])

  let route = (
    <Switch>
      <Route exact path='/' component={BurgerBuilder} />
      <Route path='/auth' component={Auth} />
      <Route path='/register' component= {Register} />
      <Redirect to='/' />
    </Switch>
  )
  if (props.isAuth) {
    route = (
      <Switch>
        <Route exact path='/' component={BurgerBuilder} />
        <Route path='/logout' component={Logout} />
        <Route path='/auth' component={Auth} />
        <Route path='/orders' component={Orders} />
        <Route path='/checkout' component={Checkout} />
        <Redirect to='/' />
      </Switch>
    )
  }

  return (
    <BrowserRouter>
      <Layout>
        <Suspense fallback= {<Spinner/>}>
          {route}
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
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

import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
// import Orders from './containers/Orders/Orders'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
// import Checkout from './containers/Checkout/Checkout';
// import Auth from './containers/Auth/Auth'
import Logout from './containers/Auth/Logout/Logout'
import {connect} from 'react-redux'
import * as actions from './store/actions/index'
import asyncComponent from './hoc/asyncComponent/asyncComponent'

const asyncCheckout = asyncComponent(() => {
  return import('./containers/Checkout/Checkout')
})

const asyncOrders = asyncComponent(() => {
  return import('./containers/Orders/Orders')
})

const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth')
})

class App extends Component {

  componentDidMount = () => {
    this.props.ontTryToRememberLogin();
  }

  render() {
    let routes = (
      <Switch>
        <Route path='/auth' component={asyncAuth}/>
        <Route path='/' component={BurgerBuilder}/>
        <Redirect to='/'/>
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = 
      <Switch>
        <Route path='/orders' component={asyncOrders} />
        <Route path='/logout' component={Logout}/>
        <Route path='/checkout' component={asyncCheckout}/>
        <Route path='/auth' component={asyncAuth}/>
        <Route path='/' component={BurgerBuilder}/>
        <Redirect to='/' />
      </Switch>
    }
    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

 const mapDispatchToProps = (dispatch) => {
  return {
    ontTryToRememberLogin: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
import React from 'react';
import {connect} from 'react-redux';
import {Redirect, Route, withRouter} from 'react-router-dom';

import Chat from './chat/Chat';
import Login from './auth/Login';
import {logout} from '../actions';
import Register from './auth/Register';


const PrivateRoute = ({component: Component, isConnected, ...rest}) => (
  <Route
    {...rest}
    render={(props) => (
      isConnected === true
        ? (
          <Component {...props} />
        ) : (
          <Redirect to={{
            pathname: '/login',
            state: {from: props.location}
          }}
          />
        )
    )}
  />
);

const Logout = connect()(class __Logout extends React.PureComponent {
  componentDidMount() {
    this.props.dispatch(logout())
  }

  render() {
    return (
      <Redirect to={{pathname: '/login'}} />
    );
  }
});

const Routes = ({isConnected}) => (
  <React.Fragment>
    <PrivateRoute exact path="/" component={Chat} isConnected={isConnected} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/register" component={Register} />
    <Route exact path="/logout" component={Logout} />
  </React.Fragment>
);

export default withRouter(connect(
  (state) => ({
    isConnected: !!state.token
  })
)(Routes));
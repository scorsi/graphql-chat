import React from 'react';
import {connect} from 'react-redux';
import {Redirect, Route} from 'react-router-dom';

import routes from '../routes';


const Root = ({isConnected}) => {
  const PrivateRoute = ({component: Component, ...rest}) => (
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

  return (
    <div>
      {routes.map((route, i) => (
        route.private === true
          ? (
            <PrivateRoute
              // eslint-disable-next-line react/no-array-index-key
              key={i}
              path={route.path}
              exact={route.exact}
              component={route.component}
            />
          ) : (
            <Route
              // eslint-disable-next-line react/no-array-index-key
              key={i}
              path={route.path}
              exact={route.exact}
              component={route.component}
            />
          )
      ))}
    </div>
  );
};

export default connect(
  (state) => ({
    isConnected: !!state.token
  })
)(Root);
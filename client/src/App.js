import React from 'react';
import {connect} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import {ApolloProvider} from 'react-apollo';

import Root from './components/Root';
import createClient from './client';


const App = ({authToken}) => (
  <ApolloProvider client={createClient(authToken)}>
    <BrowserRouter>
      <Root/>
    </BrowserRouter>
  </ApolloProvider>
);

export default connect(
  (state) => {
    return {
      authToken: state.token
    }
  }
)(App);
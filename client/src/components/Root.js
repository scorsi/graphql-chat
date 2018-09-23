import React from 'react';
import {withRouter} from 'react-router-dom';

import Routes from './Routes';
import TopBar from './general/TopBar';


const Root = () => (
  <React.Fragment>
    <TopBar />
    <Routes />
  </React.Fragment>
);

export default withRouter(Root);
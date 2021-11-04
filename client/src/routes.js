import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import App from './App';
import Login from './views/login/Login';
 

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/login" component={Login}></Route>
      <App path="/">
        <Switch>
          {/* <Route path="/" component={Root}></Route> */}
        </Switch>
      </App>
    </Switch>
  </BrowserRouter>
);

export default Routes;

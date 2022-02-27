import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import withUnAuthenticated from './hoc/withUnAuthenticated';
import withAuthenticated from './hoc/withAuthenticated';

import App from './App';
import Login from './views/Login/Login';
import DashBoard from './views/DashBoard/DashBoard';
import NewItem from './views/NewItem/NewItem';
import Chats from './views/Chats/Chats';
import Activity from './views/Activity/Activity';
import Profile from './views/Profile/Profile';
import NearbyItems from './views/NearbyItems/NearbyItems';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/login" component={withUnAuthenticated(Login)}></Route>
      <App path="/">
        <Switch>
          <Route path="/newItem" component={withAuthenticated(NewItem)}></Route>
          <Route path="/chats" component={withAuthenticated(Chats)}></Route>
          <Route path="/activity" component={withAuthenticated(Activity)}></Route>
          <Route path="/profile" component={withAuthenticated(Profile)}></Route>
          <Route path="/nearbyItems" component={withAuthenticated(NearbyItems)}></Route>
          <Route path="/" component={withAuthenticated(DashBoard)}></Route>
        </Switch>
      </App>
    </Switch>
  </BrowserRouter>
);

export default Routes;

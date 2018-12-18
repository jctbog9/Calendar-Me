import React from 'react';
import {Router, browserHistory, Route, IndexRoute } from 'react-router';
import LandingPage from '../containers/LandingPage';
import AdminPage from '../containers/AdminPage'

export const App = (props) => {
  return (
    <Router history={browserHistory}>
      <Route path='/' component={LandingPage} />
      <Route path='/admin' component={AdminPage} />
    </Router>
  );
};

export default App;

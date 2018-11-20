import React from 'react';
import {Router, browserHistory, Route, IndexRoute } from 'react-router';
import LandingPage from '../containers/LandingPage';

export const App = (props) => {
  return (
    <Router history={browserHistory}>
      <Route path='/' component={LandingPage} />
    </Router>
  );
};

export default App;

import React from 'react';
import {Router, browserHistory, Route, IndexRoute } from 'react-router';

import LandingPage from '../containers/LandingPage';
import EditEventsContainer from '../containers/EditEventsContainer';

export const App = (props) => {
  return (
    <Router history={browserHistory}>
      <Route path='/' component={LandingPage} />
      <Route path='/my-events' component={EditEventsContainer} />
    </Router>
  );
};

export default App;

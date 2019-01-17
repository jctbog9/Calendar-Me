import React from 'react';
import {Router, browserHistory, Route, IndexRoute } from 'react-router';

import LandingPage from '../containers/LandingPage';
import AdminPage from '../containers/AdminPage'
import TeamLeaderPage from '../containers/TeamLeaderPage'

import EditEventsContainer from '../containers/EditEventsContainer';

import EditUserPage from '../containers/EditUserPage';

export const App = (props) => {

  let path;

  if (window.currentUser.role === 'admin'){
    path = <Route path='/' component={AdminPage} />
  } else if (window.currentUser.role === 'leader') {
    path = <Route path='/' component={TeamLeaderPage}/>
  } else {
    path = <Route path='/' component={LandingPage} />
  }

  return (
    <Router history={browserHistory}>
      {path}
      <Route path='/my-events' component={EditEventsContainer} />
      <Route path='/edit-profile' component={EditUserPage} />
    </Router>
  );
};

export default App;

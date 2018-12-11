import React, { Component } from 'react';
import Calendar from './Calendar';
import EventsContainer from './EventsContainer'

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return(
      <div>
        <Calendar />
        <EventsContainer />
      </div>
    )
  }
}

export default LandingPage;

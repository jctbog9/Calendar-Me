import React, { Component } from 'react';
import Calendar from './Calendar';
import EventBrite from './EventBrite'

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
        <EventBrite />
      </div>
    )
  }
}

export default LandingPage;

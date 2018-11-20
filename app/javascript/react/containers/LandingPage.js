import React, { Component } from 'react';
import Calendar from './Calendar';

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };

  }

  render() {
    return(
      <div>
        <Calendar />
      </div>
    )
  }
}

export default LandingPage;

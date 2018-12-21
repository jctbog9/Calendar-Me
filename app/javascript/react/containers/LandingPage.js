import React, { Component } from 'react';
import Calendar from './Calendar';
import EventsContainer from './EventsContainer'

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      suggestedEvents: []
    }
    this.addEventToCalendar = this.addEventToCalendar.bind(this)
    this.removeSuggestedEvent = this.removeSuggestedEvent.bind(this)
  }

  componentDidMount() {
    fetch('api/v1/events')
    .then(response => response.json())
    .then(body => {
      this.setState({
        suggestedEvents: body
      })
    })
  }

  addEventToCalendar(formPayload){
    this.setState({events: this.state.events.concat(formPayload)})
    let signup = {
      user_id: window.currentUser.id,
      event_id: formPayload.id
    }

    fetch(`/api/v1/all_signups`, {
      method: 'POST',
      body: JSON.stringify(signup),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin'
    })
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
              error = new Error(errorMessage);
          throw(error);
        }
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  removeSuggestedEvent(closedPayload){
    this.setState({ suggestedEvents: this.state.suggestedEvents.filter(event => closedPayload !== event.id) })
  }

  render() {
    return(
      <div>
        <Calendar
          addedEvents={this.state.events}
        />
        <EventsContainer
          removeSuggestedEvent={this.removeSuggestedEvent}
          suggestedEvents={this.state.suggestedEvents}
          addEventToCalendar={this.addEventToCalendar}
        />
      </div>
    )
  }
}

export default LandingPage;

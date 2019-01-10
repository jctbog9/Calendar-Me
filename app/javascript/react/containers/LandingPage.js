import React, { Component } from 'react';

import Calendar from './Calendar';

import EventsContainer from './EventsContainer'
import EventFormContainer from './EventFormContainer'

import SearchBar from '../components/SearchBar'

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addedEvents: [],
      suggestedEvents: [],
      showEventForm: false
    }
    this.addEventToCalendar = this.addEventToCalendar.bind(this)
    this.removeSuggestedEvent = this.removeSuggestedEvent.bind(this)
    this.undoButtonClick = this.undoButtonClick.bind(this)
    this.showEventForm = this.showEventForm.bind(this)
    this.hideEventForm = this.hideEventForm.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
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

  undoButtonClick(undoPayload){
    this.setState({ addedEvents: this.state.events.filter(event => undoPayload.id !== event.id) })
  }

  handleFormSubmit(formPayload){
    this.setState({ suggestedEvents: this.state.suggestedEvents.concat(formPayload) })
    fetch(`/api/v1/events`, {
      method: 'POST',
      body: JSON.stringify(formPayload),
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

  showEventForm(){
    this.setState({ showEventForm: true })
  }

  hideEventForm(){
    this.setState({ showEventForm: false })
  }

  handleSearch(matchingEvents) {
    this.setState({ suggestedEvents: matchingEvents })
  }

  render() {
    let customForm;
    if (this.state.showEventForm) {
      customForm =
      <div>
        <button className="form-button" onClick={this.hideEventForm}>Hide Form</button>
        <EventFormContainer
          handleFormSubmit={this.handleFormSubmit}
        />
      </div>
    } else {
      customForm =
      <button className="form-button" onClick={this.showEventForm}>Add Custom Event</button>
    }

    return(
      <div>
        <Calendar
          addedEvents={this.state.addedEvents}
        />
        {customForm}
        <SearchBar
          handleSearch={this.handleSearch}
          suggestedEvents={this.state.suggestedEvents}
        />
        <EventsContainer
          undoButtonClick={this.undoButtonClick}
          removeSuggestedEvent={this.removeSuggestedEvent}
          suggestedEvents={this.state.suggestedEvents}
          addEventToCalendar={this.addEventToCalendar}
        />
      </div>
    )
  }
}

export default LandingPage;

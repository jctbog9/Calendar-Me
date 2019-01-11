import React, { Component } from 'react'
import EventTile from '../components/EventTile'

class EventsContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      events: []
    }
    this.handleAddEvent = this.handleAddEvent.bind(this)
    this.handleCloseEvent = this.handleCloseEvent.bind(this)
    this.undoButtonClick = this.undoButtonClick.bind(this)
  }

  handleAddEvent(formPayload){
    this.props.addEventToCalendar(formPayload)
  }

  handleCloseEvent(closedPayload){
    this.props.removeSuggestedEvent(closedPayload)
  }

  undoButtonClick(undoPayload){
    this.props.undoButtonClick(undoPayload)
  }

  render () {
    let events = this.props.suggestedEvents.map(event => {
      let logo;
      let url;
      if(event.logo != undefined) {
        logo = event.url
      } else {logo = "N/A"}

      if(event.url != null) {
        url = event.url
      } else {url = "N/A"}

      return(
        <EventTile
          key={event.id}
          id={event.id}
          event={event}
          organizer={event.organizer}
          name={event.name}
          description={event.description}
          location={event.location}
          url={url}
          logo={logo}
          date={event.date}
          time={event.time}
          ticket_price={event.ticket_price}
          addEventToCalendar={this.handleAddEvent}
          closeEvent={this.handleCloseEvent}
          undoButtonClick={this.undoButtonClick}
        />
      )
    })
    return(
      <div className="events-holder">
        <h2>Suggested Events</h2>
        {events}
      </div>
    )
  }
}

export default EventsContainer;

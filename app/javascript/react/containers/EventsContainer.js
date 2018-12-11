import React from 'react'
import EventTile from '../components/EventTile'

class EventsContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      events: []
    }
  }
  componentDidMount() {
    fetch('api/v1/events')
    .then(response => response.json())
    .then(body => {
      this.setState({
        events: body
      })
    })
  }

  render () {
    let events = this.state.events.map(event => {
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
          name={event.name}
          description={event.description}
          location={event.location}
          url={url}
          logo={logo}
          date={event.date}
          time={event.time}
          ticket_price={event.ticket_price}
        />
      )
    })
    return(
      <div className="events-holder">
        {events}
      </div>
    )
  }
}

export default EventsContainer;

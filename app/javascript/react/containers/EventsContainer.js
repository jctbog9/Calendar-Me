import React from 'react'
import EventTile from '../components/EventTile'

class EventsContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        events: []
    }
    this.handleClick = this.handleClick.bind(this)
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

  addEvent(payLoad) {

  }

  handleClick(event) {
    event.preventDefault()
    debugger

  }
  render () {
    let event = this.state.events.map(event => {
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
          url={url}
          logo={logo}
          date={event.date}
          time={event.time}
          end_time={event.end_time}
          all_day={event.add_day}
          ticket_price={event.ticket_price}
          handleClick={this.handleClick}
        />
      )
    })
    return(
      <div>
        <ol>
          {event}
        </ol>
      </div>
    )
  }
}

export default EventsContainer;

import React from 'react'
import EventBriteTile from '../components/EventBriteTile'

class EventBrite extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        events: []
    }
    this.handleClick = this.handleClick.bind(this)
  }
  componentWillMount() {
    fetch('https://www.eventbriteapi.com/v3/events/search/?location.address=boston&subcategories=2003%2C2001%2C2002&search_type=networking&token=JLHHNB4KRCZWR7WZPKAY')
    .then(response => response.json())
    .then(body => {
      this.setState({
        events: body.events
      })
    })
  }

  addEvent(payLoad) {

  }

  handleClick(event) {
    event.preventDefault()

  }
  render () {
    let event = this.state.events.map(event => {
      let logo;
      debugger
      if(event.logo != null) {
        logo = event.logo.original.url
      } else {logo = "N/A"}
      return(
        <EventBriteTile
          key={event.id}
          id={event.id}
          name={event.name.text}
          description={event.description.text}
          url={event.url}
          logo={logo}
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

export default EventBrite;

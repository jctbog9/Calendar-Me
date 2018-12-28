import React, { Component } from 'react'
import moment from 'moment'
import { Link } from 'react-router'

class EditEventsContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      calendarEvents: []
    }
  }

  componentDidMount(){
    fetch('api/v1/signups')
    .then(response => response.json())
    .then(body => {
      this.setState({
        calendarEvents: body
      })
    })
  }

  deleteEventSignup(signup){
    fetch(`/api/v1/signups/${signup.event.id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin'
    })
      .then(this.setState({ calendarEvents: this.state.calendarEvents.filter(event => signup.event.id !== event.event.id)}))
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

  render () {

    let mappedEvents = this.state.calendarEvents.map(event => {

      let date = moment(event.event.date).format('MM/DD/YYYY')

      let handleSignupDelete = () => {
        this.deleteEventSignup(event)
      }

      return(
        <div key={event.id} className="edit-box">
          <p>{event.event.name} - </p>
          <p>{date}</p>
          <a href={event.event.url} target="_blank"><button className="delete-button">Event Details</button></a>
          <button className="delete-button" onClick={handleSignupDelete}>Delete Event</button>
        </div>
      )
    })

    return(
      <div className="edit-box-wrapper">
        <Link to='/'>
          <button className="back-button-center">Back To My Calendar</button>
        </Link>
        {mappedEvents}
        <Link to='/'>
          <button className="back-button-center">Back To My Calendar</button>
        </Link>
      </div>
    )
  }
}

export default EditEventsContainer;

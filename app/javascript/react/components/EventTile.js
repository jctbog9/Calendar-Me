import React, { Component } from 'react'
import moment from 'moment'

class EventTile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false
    }
    this.handleButtonClick = this.handleButtonClick.bind(this)
    this.handleUndo = this.handleUndo.bind(this)
    this.handleCloseEvent = this.handleCloseEvent.bind(this)
  }

  handleCloseEvent(){
    this.props.closeEvent(this.props.id)
  }

  handleButtonClick() {
    this.setState({ clicked: true })
    let formPayload = {
      id: this.props.id,
      name: this.props.name,
      location: this.props.location,
      date: this.props.date,
      time: this.props.time,
      description: this.props.description,
      url: this.props.url
    }
    this.props.addEventToCalendar(formPayload)
  }

  handleUndo(){
    this.setState({ clicked: false })
    this.props.undoButtonClick(
      {
        id: this.props.id,
        name: this.props.name,
        location: this.props.location,
        date: this.props.date,
        time: this.props.time,
        description: this.props.description,
        url: this.props.url,
        event_id: this.props.event_id
      }
    )
    fetch(`/api/v1/signups/${this.props.id}`, {
      method: 'DELETE',
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

  render(){
    if (this.props.logo == 'N/A') {
    }else {
      <p><img className='event-logo' src={this.props.logo} alt='logos' width='25%'/></p>
    }

    let date = moment(this.props.date).format('MM/DD/YYYY')

    if (this.state.clicked === false) {
      return (
        <div className="event-container">
          <div className="event-centerize">
            <li>{this.props.name}</li>
            <li>{date}</li>
            <li>{this.props.time}</li>
            <li>{this.props.location}</li>
            <a href={this.props.url} className="button" target="_blank">Event Details</a>
            <button className="button" onClick={this.handleButtonClick}>Add to calendar</button>
          </div>
        </div>
      )
    } else {
      return (
        <div className="event-container-clicked">
          <i id="x-icon" className="fas fa-times fa-2x" onClick={this.handleCloseEvent}></i>
          <div className="added-succesfully">
            <p>{this.props.name} Added!</p>
          </div>
          <button onClick={this.handleUndo} className="undo-button">Undo</button>
        </div>
      )
    }
  }
}

export default EventTile

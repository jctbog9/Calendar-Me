import React from 'react'
import moment from 'moment'

const EventTile = (props) => {

  if (props.logo == 'N/A') {
  }else {
    <p><img className='event-logo' src={props.logo} alt='logos' width='25%'/></p>
  }

  let date = moment(props.date).format('MM/DD/YYYY')

  let handleButtonClick = () => {
    let formPayload = {
      id: props.id,
      name: props.name,
      location: props.location,
      date: props.date,
      time: props.time,
      description: props.description,
      url: props.url,
      event_id: props.event_id
    }
    props.addEventToCalendar(formPayload)
  }

  return (
    <div className="event-container">
      <div className="event-centerize">
        <li>{props.name}</li>
        <li>{date}</li>
        <li>{props.time}</li>
        <li>{props.location}</li>
        <a href={props.url} className="button" target="_blank">Event Details</a>
        <button className="button" onClick={handleButtonClick}>Add to calendar</button>
      </div>
    </div>
  )
}

export default EventTile

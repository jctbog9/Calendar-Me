import React from 'react'

const EventTile = (props) => {


  if (props.logo == 'N/A') {
  }else {
    <p><img className='event-logo' src={props.logo} alt='logos' width='25%'/></p>
  }


  return (
    <div className="event-container">
      <div className="event-centerize">
        <li>{props.name}</li>
        <li>{props.date}</li>
        <li>{props.time}</li>
        <li>{props.location}</li>
        <a href={props.url} className="button">Event Details</a>
        <button className="button">Add to calendar</button>
      </div>
    </div>
  )
}

export default EventTile

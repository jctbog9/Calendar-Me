import React from 'react'

const EventTile = (props) => {


  if (props.logo == 'N/A') {
  }else {
    <p><img className='event-logo' src={props.logo} alt='logos' width='25%'/></p>
  }


  return (
    <div>
      <li>
        <a className='eventName' onClick={props.handleClick}>{props.name}</a>
        <p>{props.description}</p>
        <a href={props.url}>Event Details</a>
      </li>
    </div>
  )
}

export default EventTile

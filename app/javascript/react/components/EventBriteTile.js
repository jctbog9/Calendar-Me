import React from 'react'

const EventBriteTile = (props) => {
  return (
    <div>
      <li>
        <p><img className='event-logo' src={props.logo} alt='logos' width='25%'/></p>
        <a className='eventName' onClick={props.handleClick}>{props.name}</a>
        <p>{props.description}</p>
        <a href={props.url}>Event Details</a>
      </li>
    </div>
  )
}

export default EventBriteTile

import React, { Component } from 'react';
import moment from 'moment';
import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = BigCalendar.momentLocalizer(moment);

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: []
    };
    this.isUser = this.isUser.bind(this);
  }

  isUser(user) {
    return user.id === parseInt(this.props.selectedUserId)
  }

  render() {
    let selectedUser = this.props.users.find(this.isUser)
    let addedEvents = selectedUser.events.map(event => {
      return({
        start: new Date(moment(event.date).format('MM/DD/YYYY')),
        end: new Date(moment(event.date).format('MM/DD/YYYY')),
        title: event.name
      })
    })

    let allEvents;
    if (this.state.events) {
      allEvents = this.state.events.concat(addedEvents)
    }
    return (
      <div>
        <h1 className='index-title'>{`${selectedUser.first_name} ${selectedUser.last_name}'s Calendar`}</h1>
        <div className='grid-x grid-margin-x calendar-container'>
          <BigCalendar
            localizer={localizer}
            events={allEvents}
            startAccessor="start"
            endAccessor="end"
            defaultDate={moment().toDate()}
          />
        </div>
      </div>
    )
  }
}

export default Calendar;

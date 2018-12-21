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
  }

  componentDidMount(){
    fetch(`/api/v1/signups`)
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
              error = new Error(errorMessage);
          throw(error);
        }
      })
      .then(response => response.json())
      .then(body => {
        let standardizedEvents = body.map(event => {
          return({
            start: new Date(moment(event.event.date).format('MM/DD/YYYY')),
            end: new Date(moment(event.event.date).format('MM/DD/YYYY')),
            title: event.event.name
          })
        })
        this.setState({ events: standardizedEvents });
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {
    let addedEvents = this.props.addedEvents.map(event => {
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
        <h1 className='index-title'>{window.currentUser.first_name}'s Calendar</h1>
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

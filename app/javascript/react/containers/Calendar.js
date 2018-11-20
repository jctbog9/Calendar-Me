import React, { Component } from 'react';
import moment from 'moment';
import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = BigCalendar.momentLocalizer(moment);

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  render() {
    const dummyEvents = [
      {
        allDay: false,
        end: new Date('December 10, 2017 11:13:00'),
        start: new Date('December 09, 2017 11:13:00'),
        title: 'hi',
      },
      {
        allDay: true,
        end: new Date('December 09, 2017 11:13:00'),
        start: new Date('December 09, 2017 11:13:00'),
        title: 'All Day Event',
      },
    ];
    return (
       <div className='grid-x grid-margin-x calendar-container'>
            <BigCalendar
              localizer={localizer}
              events={dummyEvents}
              startAccessor="start"
              endAccessor="end"
              defaultDate={moment().toDate()}
            />
       </div>
    )
  }
}

export default Calendar;

import React, { Component } from 'react'

import TextField from '../components/TextField'

class EventFormContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      location: '',
      date: '',
      time: '',
      url: '',
      submitted: false
    }
    this.handleFormFieldChange = this.handleFormFieldChange.bind(this)
    this.handleFormClear = this.handleFormClear.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  handleFormFieldChange(event){
    this.setState({ [event.target.name]: event.target.value});
  }

  handleFormClear(){
    this.setState({
      name: '',
      location: '',
      date: '',
      time: '',
      url: ''
    })
  }

  handleFormSubmit(event){
    event.preventDefault()
    let formPayload = {
      name: this.state.name,
      location: this.state.location,
      date: this.state.date,
      time: this.state.time,
      url: this.state.url
    }
    this.props.handleFormSubmit(formPayload)
    this.setState({ submitted: true })
  }

  render() {

    if (this.state.submitted === false){
      return(
        <form onSubmit={this.handleFormSubmit} className="custom-event-form">
          <TextField
            label="Name"
            name="name"
            value={this.state.name}
            onChange={this.handleFormFieldChange}

          />
          <TextField
            label="Location"
            name="location"
            value={this.state.location}
            onChange={this.handleFormFieldChange}
          />
          <TextField
            label="Date (MM/DD/YYYY)"
            name="date"
            value={this.state.date}
            onChange={this.handleFormFieldChange}
          />
          <TextField
            label="Time"
            name="time"
            value={this.state.time}
            onChange={this.handleFormFieldChange}
          />
          <TextField
            label="Event's Website URL"
            name="url"
            value={this.state.url}
            onChange={this.handleFormFieldChange}
          />
          <button type="submit">Submit Event</button>
          <button onClick={this.handleFormClear}>Clear Form</button>
        </form>
      )
    } else if (this.state.submitted === true) {
      return(
        <div>
          Event Succesfully Added!
        </div>
      )
    }
  }
}

export default EventFormContainer;

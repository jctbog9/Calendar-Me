import React, { Component } from 'react';

import TextField from '../components/TextField'
import RadioButton from '../components/RadioButton'

class AdminAddUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      businessPhone: "",
      personalPhone: "",
      email: "",
      role: "",
      team_id: "",
      successMessage: "",
      teams: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleFormClear = this.handleFormClear.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentDidMount(){
    fetch('api/v1/teams',
    {
      credentials: 'same-origin'
    })
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
        error = new Error(errorMessage);
        throw error;
      }
    })
    .then(response => response.json())
    .then(response => {
      this.setState({ teams: response });
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleFormClear() {
    event.preventDefault();
    this.setState(
      {
        firstName: "",
        lastName: "",
        businessPhone: "",
        personalPhone: "",
        email: "",
        role: "",
        team_id: ""
      }
    );
  }

  handleFormSubmit(event) {
    event.preventDefault();
    if (this.state.firstName != "" && this.state.lastNameName != "" && this.state.businessPhone != "" && this.state.email != "" && this.state.role != "") {

      let formPayload = {
        first_name: this.state.firstName,
        last_name: this.state.lastName,
        business_phone: this.state.businessPhone,
        personal_phone: this.state.personalPhone,
        email: this.state.email,
        role: this.state.role,
        team_id: this.state.team_id
      };
      this.setState({ successMessage: "User succesfully created!"})
      this.props.addUser(formPayload);
      this.handleFormClear();
    }
  }

  render() {

  let options;

  if (this.state.teams){
    options = this.state.teams.map(team => {
      return <option key={team.id} value={team.id}>{team.name}</option>
    })
  }

    return(
      <div>
        <h2>Create New User</h2>
        <form onSubmit={this.handleFormSubmit}>
          <div className="grid-x">
            <div className="first-and-last">
              {this.state.successMessage}
              <div className="cell large-5">
                <TextField
                  name="firstName"
                  onChange={this.handleChange}
                  value={this.state.firstName}
                  label="First Name:"
                />
              </div>
              <div className="cell large-6">
                <TextField
                  name="lastName"
                  onChange={this.handleChange}
                  value={this.state.lastName}
                  label="Last Name:"
                />
              </div>
            </div>
            <div className="phone-numbers">
              <div className="cell large-5">
                <TextField
                  name="businessPhone"
                  onChange={this.handleChange}
                  value={this.state.businessPhone}
                  label="Business Phone:"
                />
              </div>
              <div className="cell large-6">
                <TextField
                  name="personalPhone"
                  onChange={this.handleChange}
                  value={this.state.personalPhone}
                  label="Personal Phone:"
                />
              </div>
            </div>
            <div className="email-and-role">
              <div className="cell large-8">
                <TextField
                  name="email"
                  onChange={this.handleChange}
                  value={this.state.email}
                  label="Email"
                />
              </div>
              <div className="cell large-3">
                <label>
                  Role:
                  <RadioButton
                    name="role"
                    label="Member"
                    onChange={this.handleChange}
                    value="member"
                  />
                  <RadioButton
                    name="role"
                    label="Team Leader"
                    onChange={this.handleChange}
                    value="leader"
                  />
                  <RadioButton
                    name="role"
                    label="Admin"
                    onChange={this.handleChange}
                    value="admin"
                  />
                </label>
              </div>
              <label>
                <select name="team_id" onChange={this.handleChange}>
                  {options}
                </select>
              Team
              </label>
            </div>
            <div className="form-buttons">
              <div className="cell large-5">
                <input className="button tiny" type="submit" value="Add User" />
              </div>
              <div className="cell large-5">
                <input className="button tiny" type="button" onClick={this.handleFormClear} value="Clear Form" />
              </div>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default AdminAddUser;

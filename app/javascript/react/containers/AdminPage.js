import React, { Component } from 'react';

import Calendar from './Calendar';
import LandingPage from './LandingPage';
import EventsContainer from './EventsContainer';

import AdminSelectUser from './AdminSelectUser';
import AdminAddUser from './AdminAddUser';
import AdminAddTeam from './AdminAddTeam';

import ShowButton from '../components/ShowButton';

class AdminPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      content: '',
      selectedUserId: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.addUser = this.addUser.bind(this);
    this.showAdminCalendar = this.showAdminCalendar.bind(this);
    this.showAddUser = this.showAddUser.bind(this);
    this.showSelectUser = this.showSelectUser.bind(this);
    this.showAddTeam = this.showAddTeam.bind(this);
  }

  componentDidMount() {
    fetch('api/v1/admin',
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
      let users = response;
      this.setState({ users: users });
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  addUser(formPayload) {
    fetch("api/v1/admin", {
      method: "POST",
      body: JSON.stringify(formPayload),
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      credentials: "same-origin"
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
      this.setState({ users: response });
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  addTeam(formPayload) {
    fetch("api/v1/teams", {
      method: "POST",
      body: JSON.stringify(formPayload),
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      credentials: "same-origin"
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
      this.setState({ users: response });
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value});
  }

  showAdminCalendar(){
    this.setState({ content: 'calendar' })
  }

  showSelectUser(){
    this.setState({ content: 'selectUser' })
  }

  showAddUser(){
    this.setState({ content: 'addUser' })
  }

  showAddTeam(){
    this.setState({ content: 'addTeam' })
  }

  render() {

    let content = <LandingPage />

    if (this.state.content === 'calendar') {
      content =
      <div>
        <LandingPage />
      </div>
    }

    if (this.state.content === 'suggestedEvents') {
      content =
      <div>
        <EventsContainer />
      </div>
    }

    if (this.state.content === 'selectUser') {
      content =
      <div>
        <AdminSelectUser
          users={this.state.users}
          handleChange={this.handleChange}
          selectedUserId={this.state.selectedUserId}
          selection='User'
        />
      </div>
    }


    if (this.state.content === 'addUser') {
      content =
      <div>
        <AdminAddUser
          handleChange={this.handleChange}
          addUser={this.addUser}
        />
      </div>
    }

    if (this.state.content === 'addTeam') {
      content =
      <div>
        <AdminAddTeam
          handleChange={this.handleChange}
          addTeam={this.addTeam}
        />
      </div>
    }

    return(
      <div>
        <div className="side-selectors">
          <ShowButton
            onClick={this.showAdminCalendar}
            name="My Calendar"
          />
          <ShowButton
            onClick={this.showSelectUser}
            name="Select User"
          />
          <ShowButton
            onClick={this.showAddUser}
            name="Add User"
          />
          <ShowButton
            onClick={this.showAddTeam}
            name="Create Team"
          />
        </div>
        <div className="content-wrapper">
          <div className="centered-content">
            {content}
          </div>
        </div>
      </div>
    )
  }
}

export default AdminPage

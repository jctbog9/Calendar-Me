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
    this.showLeaderCalendar = this.showLeaderCalendar.bind(this);
    this.showSelectUser = this.showSelectUser.bind(this);
  }

  componentDidMount() {
    fetch('api/v1/current_team',
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
      this.setState({ users: response });
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value});
  }

  showLeaderCalendar(){
    this.setState({ content: 'calendar' })
  }

  showSelectUser(){
    this.setState({ content: 'selectUser' })
  }


  render() {

    let content = <LandingPage />

    if (this.state.content === 'calendar') {
      content =
      <div>
        <LandingPage />
      </div>
    }

    if (this.state.content === 'selectUser') {
      content =
      <div>
        <AdminSelectUser
          users={this.state.users}
          handleChange={this.handleChange}
          selectedUserId={this.state.selectedUserId}
          selection='Team Member'
        />
      </div>
    }

    return(
      <div>
        <div className="side-selectors">
          <ShowButton
            onClick={this.showLeaderCalendar}
            name="My Calendar"
          />
          <ShowButton
            onClick={this.showSelectUser}
            name="Select User"
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

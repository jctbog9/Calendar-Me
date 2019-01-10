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
      sidebar: true
    };
    this.handleChange = this.handleChange.bind(this);
    this.showLeaderCalendar = this.showLeaderCalendar.bind(this);
    this.showSelectUser = this.showSelectUser.bind(this);
    this.hideSideBar = this.hideSideBar.bind(this);
    this.showSideBar = this.showSideBar.bind(this);
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

  hideSideBar(){
    this.setState({ sidebar: false })
  }

  showSideBar(){
    this.setState({ sidebar: true })
  }

  render() {

    let sidebar;
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

    if (this.state.sidebar === true) {
      sidebar =
        <div className="side-selectors">
          <i id="x-icon" className="fas fa-times fa-2x" onClick={this.hideSideBar}/>
          <ShowButton
            onClick={this.showLeaderCalendar}
            name="My Calendar"
          />
          <ShowButton
            onClick={this.showSelectUser}
            name="Select User"
          />
        </div>

      content =
        <div className="content-wrapper">
          <div className="centered-content">
            {content}
          </div>
        </div>
    } else {
      sidebar = <i className="fas fa-arrow-right fa-2x" onClick={this.showSideBar}/>
      content =
      <div className="centered-content">
        {content}
      </div>
    }

    return(
      <div>
        {sidebar}
        {content}
      </div>
    )
  }
}

export default AdminPage

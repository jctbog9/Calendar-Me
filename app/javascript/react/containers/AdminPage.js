import React, { Component } from 'react';
import AdminSelectUser from './AdminSelectUser';
import AdminAddUser from './AdminAddUser';

class AdminPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      showElements: "",
      selectedUserId: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.displayElements = this.displayElements.bind(this);
    this.addUser = this.addUser.bind(this);
  }

  displayElements(event) {
    if (this.state.showElements != event.target.id) {
      this.setState({ showElements: event.target.id });
    } else {
      this.setState({ showElements: "" });
    }
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value});
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

  render() {
    return(
      <div className="grid-x grid-margin-x">
        <div className="cell large-8 large-offset-2">
          <div className="cell admin-users">
            <p id="admin-users">Users</p>
            <a onClick={this.displayElements} name="showElements" id='show-admin-users'>Show</a>
          </div>
          {this.state.showElements === 'show-admin-users' && <AdminSelectUser
            users={this.state.users}
            handleChange={this.handleChange}
            selectedUserId={this.state.selectedUserId}
          />}
          <div className="cell admin-add-user">
            <p id="admin-add-user">Add User</p>
            <a onClick={this.displayElements} name="showElements" id='show-admin-add-user'>Show</a>
          </div>
          {this.state.showElements === 'show-admin-add-user' && <AdminAddUser
            handleChange={this.handleChange}
            addUser={this.addUser}
          />}
        </div>
      </div>
    )
  }
}

export default AdminPage

import React, { Component } from 'react';
import AdminSelectUser from './AdminSelectUser';

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
            <p onClick={this.displayElements} name="showElements" id="admin-add-user">Add User</p>
          </div>
          <div className="cell admin-edit-user">
            <p onClick={this.displayElements} name="showElements" id="admin-edit-user">Edit User</p>
          </div>
        </div>
      </div>
    )
  }
}

export default AdminPage

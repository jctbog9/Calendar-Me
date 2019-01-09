import React, { Component } from 'react';
import SelectTile from '../components/SelectTile';
import AdminUserCalendar from './AdminUserCalendar';
// import AdminEditUser from './AdminEditUser';

class AdminSelectUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showElements: ""
    };
    this.displayElements = this.displayElements.bind(this);
  }

  displayElements(event) {
    if (this.state.showElements != event.target.id) {
      this.setState({ showElements: event.target.id });
    } else {
      this.setState({ showElements: "" });
    }
  }

  render() {
    let users = this.props.users.map((user) => {
      return(
        <SelectTile
          key={user.id}
          id={user.id}
          firstName={user.first_name}
          lastName={user.last_name}
        />
      );
    });
    return(
      <div>
        <h2>View User</h2>
        <label>Select {this.props.selection}</label>
        <select name="selectedUserId" value={this.props.selectedUser} onChange={this.props.handleChange}>
          <option value={0} name="selectedUserId"></option>
          {users}
        </select>
        {this.props.selectedUserId != "" && <AdminUserCalendar
            selectedUserId={this.props.selectedUserId}
            users={this.props.users}
        />}
      </div>
    )
  }
}

export default AdminSelectUser;

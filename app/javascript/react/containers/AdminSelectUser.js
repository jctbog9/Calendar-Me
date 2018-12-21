import React, { Component } from 'react';
import SelectTile from '../components/SelectTile';

class AdminSelectUser extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };

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
        <select name="selectedUser" value={this.props.selectedUser} onChange={this.props.handleChange}>
          <option value={0} name="selectedUser"></option>
          {users}
        </select>
        
      </div>
    )
  }
}

export default AdminSelectUser;

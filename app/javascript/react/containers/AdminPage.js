import React, { Component } from 'react';

class AdminPage extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };

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
      let adminInfo = response;
      debugger;
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {
    return(
      <div className="grid-x grid-margin-x">
        <div className="cell large-8 large-offset-2 admin-users">
          <div className="grid-x">
            <div className="cell large-2">
              <p>Users</p>
            </div>
            <div className="cell large-2">
              <p>Show</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default AdminPage

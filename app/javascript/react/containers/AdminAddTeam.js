import React, { Component } from 'react';

class AdminAddTeam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      successMessage: "",
      teamName: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleFormClear = this.handleFormClear.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleFormClear() {
    event.preventDefault();
    this.setState({ teamName: "" });
  }

  handleFormSubmit(event) {
    event.preventDefault();
    if (this.state.teamName !== "") {

      let formPayload = {
        name: this.state.teamName
      };

      this.props.addTeam(formPayload);
      this.setState({ successMessage: "Team succesfully created!"})
      this.handleFormClear();
    }
  }

  render() {
    return(
      <form onSubmit={this.handleFormSubmit}>
        <div className="grid-x">
          <div>
            <div>
              <h2>Create New Team</h2>
              {this.state.successMessage}
              <label>
                Team Name:
              </label>
              <input
                type="text"
                name="teamName"
                value={this.state.teamName}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <input className="button tiny" type="submit" value="Create Team" />
            </div>
            <div>
              <input className="button tiny" type="button" onClick={this.handleFormClear} value="Clear Form" />
            </div>
          </div>
        </div>
      </form>
    )
  }
}

export default AdminAddTeam;

import React, { Component } from 'react';

class AdminAddUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      businessPhone: "",
      personalPhone: "",
      email: "",
      role: ""
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
    this.setState(
      {
        firstName: "",
        lastName: "",
        businessPhone: "",
        personalPhone: "",
        email: "",
        role: ""
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
        role: this.state.role
      };

      this.props.addUser(formPayload);
      this.handleFormClear();
    }
  }

  render() {
    return(
      <form onSubmit={this.handleFormSubmit}>
        <div className="grid-x">
          <div className="first-and-last">
            <div className="cell large-5">
              <label>
                First Name:
                <input
                  type="text"
                  name="firstName"
                  value={this.state.firstName}
                  onChange={this.handleChange}
                />
              </label>
            </div>
            <div className="cell large-6">
              <label>
                Last Name:
                <input
                  type="text"
                  name="lastName"
                  value={this.state.lastName}
                  onChange={this.handleChange}
                />
              </label>
            </div>
          </div>
          <div className="phone-numbers">
            <div className="cell large-5">
              <label>
                Business Phone:
                <input
                  type="text"
                  name="businessPhone"
                  value={this.state.businessPhone}
                  onChange={this.handleChange}
                />
              </label>
            </div>
            <div className="cell large-6">
              <label>
                Personal Phone:
                <input
                  type="text"
                  name="personalPhone"
                  value={this.state.personalPhone}
                  onChange={this.handleChange}
                />
              </label>
            </div>
          </div>
          <div className="email-and-role">
            <div className="cell large-8">
              <label>
                Email:
                <input
                  type="text"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
              </label>
            </div>
            <div className="cell large-3">
              <label>
                Role:
                <label>
                  <input
                    type="radio"
                    name="role"
                    value="member"
                    onChange={this.handleChange}
                  />
                  Member
                </label>
                <label>
                  <input
                    type="radio"
                    name="role"
                    value="teamLeader"
                    onChange={this.handleChange}
                  />
                  Team Leader
                </label>
              </label>
            </div>
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
    )
  }
}

export default AdminAddUser;

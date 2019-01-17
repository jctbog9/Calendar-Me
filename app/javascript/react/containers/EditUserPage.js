import React, { Component } from 'react';

import TextField from '../components/TextField'

class EditUserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showChangePassword: false,
      newPassword: '',
      confirmPassword: '',
      submittedPassword: false,
      wrongPassword: false
    };
    this.showChangePassword = this.showChangePassword.bind(this)
    this.hideChangePassword = this.hideChangePassword.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this)
    this.newPasswordSubmit = this.newPasswordSubmit.bind(this)
  }

  showChangePassword(){
    this.setState({ showChangePassword: true })
  }

  hideChangePassword(){
    this.setState({ showChangePassword: false })
  }

  handlePasswordChange(event){
    this.setState({ newPassword: event.target.value })
  }
  handleConfirmPasswordChange(event){
    this.setState({ confirmPassword: event.target.value })
  }

  newPasswordSubmit(event){
    event.preventDefault()

    if (this.state.confirmPassword === this.state.newPassword) {
      let password = {password: this.state.newPassword}

      fetch(`/api/v1/edit_user`, {
        method: 'POST',
        body: JSON.stringify(password),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
      })
        .then(response => {
          if (response.ok) {
            return response;
          } else {
            let errorMessage = `${response.status} (${response.statusText})`,
                error = new Error(errorMessage);
            throw(error);
          }
        })
        .then(this.setState({ newPassword: '', submittedPassword: true, showChangePassword: false, wrongPassword: false }))
        .catch(error => console.error(`Error in fetch: ${error.message}`));
    } else {
      this.setState({ wrongPassword: true })
    }
  }

  render() {

    let changePassword;
    let submitMessage;
    let wrongPasswordMessage;

    if (this.state.wrongPassword === true) {
      wrongPasswordMessage =
      <div className="wrong-password">
        Passwords do not match. Please try again.
      </div>
    }

    if (this.state.showChangePassword === false){
      changePassword = <button onClick={this.showChangePassword}>Change Password</button>
    } else {
      changePassword =
      <div className="change-password-container">
        <button onClick={this.hideChangePassword}>Hide</button>
        <form onSubmit={this.newPasswordSubmit}>
          {wrongPasswordMessage}
          <TextField
            name="newPassword"
            value={this.state.newPassword}
            label="New Password"
            onChange={this.handlePasswordChange}
            className="edit-password-form-field"
            type="password"
          />
          <TextField
            name="confirmPassword"
            value={this.state.confirmPassword}
            label="New Password"
            onChange={this.handleConfirmPasswordChange}
            className="edit-password-form-field"
            type="password"
          />
          <input type="submit" className="button" id="edit-password-button"/>
        </form>
      </div>
    }

    if (this.state.submittedPassword === true) {
      submitMessage =
      <div className="correct-password-message">
        Password Succesfully Changed!
      </div>
    }

    return(
      <div className="signin-content">
        <div className="signin-box">
          <div className="signin-box-content">
            <h3>{window.currentUser.first_name} {window.currentUser.last_name}</h3>
            <h3>Email: {window.currentUser.email}</h3>
            {submitMessage}
            {changePassword}
          </div>
        </div>
      </div>
    )
  }
}

export default EditUserPage

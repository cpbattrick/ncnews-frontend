import React from "react";
import { getUser } from "../api";

class LoginBox extends React.Component {
  state = {
    userInput: ""
  };

  handleSubmit = event => {
    event.preventDefault();
    const { userInput } = this.state;
    getUser(userInput).then(user => {
      this.props.loginUser(user.username);
    });
  };

  storeUserInput = event => {
    this.setState({ userInput: event.target.value });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.storeUserInput} type="text" />
          <button type='submit'>Login</button>
          <button type='button' onClick={this.props.logoutUser}>Logout</button>
        </form>
      </div>
    );
  }
}

export default LoginBox;

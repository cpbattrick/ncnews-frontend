import React from "react";
import { getUser } from "../api";
import Error from "./Error";

class LoginBox extends React.Component {
  state = {
    userInput: "jessjelly",
    err: null
  };

  handleSubmit = event => {
    event.preventDefault();
    const { userInput } = this.state;
    getUser(userInput)
      .then(user => {
        this.setState({ err: null });
        this.props.loginUser(user.username);
      })
      .catch(({ response: { data: { msg } } }) => {
        this.setState({ err: msg });
      });
  };

  storeUserInput = event => {
    this.setState({ userInput: event.target.value });
  };

  render() {
    return (
      <div className="login">
        <form onSubmit={this.handleSubmit}>
          <input
            className="loginInput"
            defaultValue="jessjelly"
            onChange={this.storeUserInput}
            type="text"
          />
          <button type="submit">Login</button>
          <button type="button" onClick={this.props.logoutUser}>
            Logout
          </button>
        </form>
        {this.state.err && <Error err={this.state.err} />}
      </div>
    );
  }
}

export default LoginBox;

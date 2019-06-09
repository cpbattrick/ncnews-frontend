import React from "react";
import { getUser } from "../api";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Typography } from "@material-ui/core";
import Popover from "./Popover";

class LoginBox extends React.Component {
  state = {
    userInput: "",
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
      <div>
        <form onSubmit={this.handleSubmit}>
          <TextField
            error={!!this.state.err}
            id="standard-name"
            label={this.state.err ? "Invalid User!" : "Username"}
            // className={classes.textField}
            onChange={this.storeUserInput}
            margin="normal"
          />
          <Popover />
          <Button
            disabled={this.props.loggedInUser ? true : false}
            type="submit"
          >
            <Typography>Login</Typography>
          </Button>
          <Button
            disabled={this.props.loggedInUser ? false : true}
            type="button"
            onClick={this.props.logoutUser}
          >
            <Typography>Logout</Typography>
          </Button>
        </form>
      </div>
    );
  }
}

export default LoginBox;

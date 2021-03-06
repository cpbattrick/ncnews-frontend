import React from "react";
import { getUser } from "../api";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import FormGroup from "@material-ui/core/FormGroup";

const styles = theme => ({
  form: {
    display: "inline-flex",
    flexDirection: "row",
    justifyContent: "baseline"
  },
  column: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    marginLeft: "1rem",
    maxWidth: "60px"
  },
  textField: {
    display: "flex",
    flexDirection: "column",
    flex: 1
  },
  container: {
    padding: "10px",
    marginLeft: "20px"
  }
});

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
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <form onSubmit={this.handleSubmit}>
          <FormGroup className={classes.form}>
            <div>
              <TextField
                id="standard-name"
                label={this.state.err ? "Invalid User!" : "Username"}
                onChange={this.storeUserInput}
                margin="dense"
                className={classes.textField}
                helperText="Default User: jessjelly"
                variant="outlined"
              />
            </div>
            <Button
              className={classes.column}
              disabled={this.props.loggedInUser ? true : false}
              type="submit"
            >
              <Typography>Login</Typography>
            </Button>
          </FormGroup>
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(LoginBox);

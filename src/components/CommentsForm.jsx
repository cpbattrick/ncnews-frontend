import React from "react";
import { postComment } from "../api";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const styles = theme => ({
  card: {
    minWidth: 275,
    width: "90%",
    marginTop: "20px",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto"
  },
  cardContent: {
    marginTop: "10px"
  },
  input: { width: "90%", marginLeft: "5%" },
  button: {
    background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
    color: "white",
    marginLeft: "5%"
  }
});

class CommentForm extends React.Component {
  state = {
    userInput: null
  };

  handleSubmit = e => {
    e.preventDefault();
    const commentBody = {
      username: this.props.loggedInUser,
      body: this.state.userInput
    };
    postComment(commentBody, this.props.article_id)
      .then(comment => {
        this.props.optRenderComment(comment);
      })
      .catch(err => {
        this.props.removeOptComment();
      });
  };

  storeUserInput = event => {
    this.setState({ userInput: event.target.value });
  };

  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <form onSubmit={this.handleSubmit}>
            <TextField
              className={classes.input}
              id="outlined-multiline-flexible"
              label="Post Comment"
              multiline
              rowsMax="4"
              onChange={this.storeUserInput}
              margin="normal"
              variant="outlined"
              required={true}
            />

            <Button
              className={classes.button}
              variant="contained"
              type="submit"
            >
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(CommentForm);

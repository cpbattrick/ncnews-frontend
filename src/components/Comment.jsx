import React from "react";
import { patchComment } from "../api";
import { purgeComment } from "../api";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { Divider } from "@material-ui/core";

const styles = theme => ({
  button: {
    marginTop: "10px",
    marginRight: "10px",
    marginBottom: "10px",
    background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
    color: "white"
  }
});

class Comment extends React.Component {
  state = {
    direction: 0
  };

  handleVote = vote => {
    patchComment(this.props.comment.comment_id, vote)
      .then(updatedComment => {
        this.setState(prevState => {
          return { direction: prevState.direction + vote };
        });
      })
      .catch(err => {
        this.setState(prevState => {
          return { direction: prevState.direction - vote };
        });
      });
  };

  deleteComment = comment_id => {
    purgeComment(comment_id).then(res => {
      this.props.optRenderDeletedComment(comment_id);
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className="comment">
        <Typography variant="h6">
          {this.props.comment.author || this.props.comment.username}
        </Typography>

        <Typography variant="body2">{this.props.comment.body}</Typography>
        <Typography variant="subtitle2">
          Upvotes: {this.props.comment.votes + this.state.direction || "0"}
        </Typography>

        {this.props.loggedInUser && (
          <div>
            {" "}
            <Button
              className={classes.button}
              variant="contained"
              disabled={this.state.direction === 1}
              onClick={() => this.handleVote(1)}
            >
              {this.state.direction === -1 ? "Bad Vote!" : "Upvote"}
            </Button>
            <Button
              className={classes.button}
              variant="contained"
              disabled={this.state.direction === -1}
              onClick={() => this.handleVote(-1)}
            >
              {this.state.direction === 1 ? "Bad Vote!" : "Downvote"}
            </Button>
          </div>
        )}

        {this.props.comment.author === this.props.loggedInUser && (
          <div>
            <Button
              className={classes.button}
              variant="contained"
              onClick={() => this.deleteComment(this.props.comment.comment_id)}
            >
              Delete
            </Button>
            <br />
          </div>
        )}

        <br />
        <Divider variant="middle" />
      </div>
    );
  }
}

export default withStyles(styles)(Comment);

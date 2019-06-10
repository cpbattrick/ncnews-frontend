import React from "react";
import { patchComment } from "../api";
import { purgeComment } from "../api";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

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
      console.log(res);
    });
  };

  render() {
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
              disabled={this.state.direction === 1}
              onClick={() => this.handleVote(1)}
            >
              {this.state.direction === -1 ? "Bad Vote!" : "Upvote"}
            </Button>
            <Button
              disabled={this.state.direction === -1}
              onClick={() => this.handleVote(-1)}
            >
              {this.state.direction === 1 ? "Bad Vote!" : "Downvote"}
            </Button>
          </div>
        )}

        {this.props.comment.author === this.props.loggedInUser && (
          <Button
            onClick={() => this.deleteComment(this.props.comment.comment_id)}
          >
            Delete
          </Button>
        )}
      </div>
    );
  }
}

export default Comment;

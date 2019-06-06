import React from "react";
import { patchComment } from "../api";

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

  render() {
    return (
      <div>
        <h3>{this.props.comment.author}</h3>
        <h4>{this.props.comment.body}</h4>
        <h4>Votes: {this.props.comment.votes + this.state.direction}</h4>

        <button onClick={() => this.handleVote(1)}>\o/</button>
        <button onClick={() => this.handleVote(-1)}>{":("}</button>

        {this.props.comment.author === this.props.loggedInUser && (
          <button
            onClick={() => this.deleteComment(this.props.comment.comment_id)}
          >
            Inappropriate
          </button>
        )}
      </div>
    );
  }
}

export default Comment;

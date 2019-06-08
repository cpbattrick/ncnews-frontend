import React from "react";
import { patchComment } from "../api";
import { purgeComment } from "../api";

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
        <h3>{this.props.comment.author}</h3>
        <h4>{this.props.comment.body}</h4>
        <h4>Votes: {this.props.comment.votes + this.state.direction}</h4>

        {this.props.loggedInUser && (
          <div>
            {" "}
            <button
              disabled={this.state.direction === 1}
              onClick={() => this.handleVote(1)}
            >
              {this.state.direction === -1 ? "Bad Vote!" : "\\o/"}
            </button>
            <button
              disabled={this.state.direction === -1}
              onClick={() => this.handleVote(-1)}
            >
              {this.state.direction === 1 ? "Bad Vote!" : ":("}
            </button>
          </div>
        )}

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

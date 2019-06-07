import React from "react";
import { getCommentsByArticleId } from "../api";
import CommentForm from "./commentsForm";
import Comment from "./comment";

class ArticleComments extends React.Component {
  state = {
    comments: []
  };

  componentDidMount() {
    getCommentsByArticleId(this.props.article_id).then(comments => {
      this.setState({ comments });
    });
  }

  optRenderComment = comment => {
    this.setState(prevState => {
      return { comments: [comment, ...prevState.comments] };
    });
  };

  render() {
    return (
      <div className="articlecomments">
        {this.props.loggedInUser && (
          <CommentForm
            article_id={this.props.article_id}
            loggedInUser={this.props.loggedInUser}
            optRenderComment={this.optRenderComment}
          />
        )}
        <h2>Comments</h2>
        {this.state.comments.map(comment => {
          return (
            <div key={`comment${comment.comment_id}`}>
              <Comment
                loggedInUser={this.props.loggedInUser}
                comment={comment}
              />
            </div>
          );
        })}
      </div>
    );
  }
}

export default ArticleComments;

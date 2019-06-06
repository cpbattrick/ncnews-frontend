import React from "react";
import { getCommentsByArticleId } from "../api";

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

  render() {
    return (
      <div>
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

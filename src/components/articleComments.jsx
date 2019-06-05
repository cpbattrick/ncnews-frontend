import React from "react";
import { getCommentsByArticleId } from "../api";

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
        {this.state.comments.map(comment => {
          return (
            <div key={`comment${comment.comment_id}`}>
              <h3>{comment.author}</h3>
              {comment.body}
            </div>
          );
        })}
      </div>
    );
  }
}

export default ArticleComments;

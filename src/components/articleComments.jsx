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

deleteComment = (comment_id) => {

}

  render() {
    return (
      <div>
        {this.state.comments.map(comment => {
          return (
            <div key={`comment${comment.comment_id}`}>
              <h3>{comment.author}</h3>
              {comment.body}
              {comment.author === this.props.loggedInUser && <button onClick={this.deleteComment}>Inappropriate</button>}
            </div>
          );
        })}
      </div>
    );
  }
}

export default ArticleComments;

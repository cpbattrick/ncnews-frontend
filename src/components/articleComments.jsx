import React from "react";
import { getCommentsByArticleId } from "../api";
import { purgeComment } from "../api";
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

  deleteComment = comment_id => {
    purgeComment(comment_id).then(res => {
      console.log(res);
    });
  };

  render() {
    return (
      <div>
        {this.state.comments.map(comment => {
          return (
            <div key={`comment${comment.comment_id}`}>
              <Comment comment={comment} />
            </div>
          );
        })}
      </div>
    );
  }
}

export default ArticleComments;

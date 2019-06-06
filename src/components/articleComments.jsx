import React from "react";
import { getCommentsByArticleId } from "../api";
import { purgeComment } from '../api'

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
 purgeComment(comment_id).then(res => {
   console.log(res)
 })
}

  render() {
    return (
      <div>
        {this.state.comments.map(comment => {
          return (
            <div key={`comment${comment.comment_id}`}>
              <h3>{comment.author}</h3>
              {comment.body}
              {comment.author === this.props.loggedInUser && <button onClick={()=> this.deleteComment(comment.comment_id)}>Inappropriate</button>}
            </div>
          );
        })}
      </div>
    );
  }
}

export default ArticleComments;

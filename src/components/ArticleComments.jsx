import React from "react";
import { getCommentsByArticleId } from "../api";
import CommentForm from "./CommentsForm";
import Comment from "./Comment";

class ArticleComments extends React.Component {
  state = {
    comments: [],
    page: 1,
    err: false
  };

  componentDidMount() {
    getCommentsByArticleId(this.props.article_id, { p: this.state.page }).then(
      comments => {
        this.setState({ comments });
      }
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page) {
      getCommentsByArticleId(this.props.article_id, {
        p: this.state.page
      }).then(comments => {
        this.setState({ comments });
      });
    }
  }

  changePage = num => {
    this.setState(prevState => {
      return { page: prevState.page + num };
    });
  };

  optRenderComment = comment => {
    this.setState(prevState => {
      return { comments: [comment, ...prevState.comments] };
    });
  };

  removeOptComment = () => {
    this.setState(prevState => {
      const editedComments = prevState.comments.slice(1);
      return { comments: editedComments, err: true };
    });
  };

  render() {
    const totalPages = Math.ceil(+this.props.comment_count / 10);
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
        {this.state.err && <div>Comment failed to post</div>}
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
        {this.state.page > 1 && (
          <button
            onClick={() => {
              this.changePage(-1);
            }}
          >
            What was that? Back up!
          </button>
        )}
        <button
          disabled={this.state.page === totalPages}
          onClick={() => {
            this.changePage(1);
          }}
        >
          Mo Comments PLS!
        </button>
      </div>
    );
  }
}

export default ArticleComments;

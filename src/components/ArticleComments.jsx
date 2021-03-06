import React from "react";
import { getCommentsByArticleId } from "../api";
import CommentForm from "./CommentsForm";
import Comment from "./Comment";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  card: {
    minWidth: 275,
    width: "90%",
    marginTop: "20px",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: "20px"
  },
  title: {
    fontSize: 30
  }
});

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

  optRenderDeletedComment = id => {
    this.setState(prevState => {
      const alteredComments = prevState.comments.filter(
        comment => comment.comment_id !== id
      );
      return {
        comments: alteredComments
      };
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
    const { classes, article_id, loggedInUser } = this.props;
    return (
      <Card className={classes.card}>
        <CardContent>
          {this.props.loggedInUser && (
            <CommentForm
              removeOptComment={this.removeOptComment}
              article_id={article_id}
              loggedInUser={loggedInUser}
              optRenderComment={this.optRenderComment}
            />
          )}
          <br />
          <Typography className={classes.title} variant="h2">
            Comments
          </Typography>
          {this.state.err && <Typography>Comment failed to post</Typography>}
          {this.state.comments.map(comment => {
            return (
              <div key={`comment${comment.comment_id}`}>
                <Comment
                  optRenderDeletedComment={this.optRenderDeletedComment}
                  loggedInUser={loggedInUser}
                  comment={comment}
                />
              </div>
            );
          })}
          {this.state.page > 1 && (
            <Button
              style={{
                marginRight: "10px",
                background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                color: "white"
              }}
              variant="contained"
              onClick={() => {
                this.changePage(-1);
              }}
            >
              What was that? Back up!
            </Button>
          )}
          <Button
            variant="contained"
            style={{
              background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
              color: "white"
            }}
            disabled={this.state.page === totalPages}
            onClick={() => {
              this.changePage(1);
            }}
          >
            Mo Comments PLS!
          </Button>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(ArticleComments);

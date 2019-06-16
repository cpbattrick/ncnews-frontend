import React from "react";
import { getArticle } from "../api";
import ArticleComments from "./ArticleComments";
import { patchArticle } from "../api";
import Error from "./Error";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
//import { textAlign } from "@material-ui/system";

const styles = theme => ({
  card: {
    minWidth: 275,
    width: "90%",
    marginTop: "20px",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto"
  },
  title: {
    fontSize: 40
  },
  pos: {
    marginBottom: 12
  },
  loading: {
    fontSize: 30,
    marginTop: "20px",
    marginLeft: "auto",
    marginRight: "auto",
    textAlign: "center"
  },
  button: {
    background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
    color: "white"
  }
});

class SingleArticle extends React.Component {
  state = {
    article: {},
    direction: 0,
    err: null
  };

  componentDidMount() {
    getArticle(this.props.article_id)
      .then(article => {
        this.setState({ article });
      })
      .catch(({ response: { data: { msg } } }) => {
        this.setState({ err: msg });
      });
  }

  handleVote = vote => {
    patchArticle(this.props.article_id, vote)
      .then(updatedArticle => {
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
    const { classes } = this.props;

    const {
      title,
      author,
      topic,
      comment_count,
      votes,
      body
    } = this.state.article;

    if (this.state.err) return <Error err={this.state.err} />;
    else if (this.state.article.title === undefined)
      return <Typography className={classes.loading}>Loading...</Typography>;
    return (
      <div>
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="h2" className={classes.title}>
              {title}
            </Typography>
            <br />
            <Divider variant="middle" />
            <br />
            <Typography variant="h6">Topic: {topic}</Typography>
            <Typography variant="h6">Author: {author}</Typography>

            <br />
            <Typography variant="body1">{body}</Typography>
            <br />
            <Divider variant="middle" />
            <br />
            <Typography variant="subtitle2">
              Approval clicks: {votes + this.state.direction}
            </Typography>
          </CardContent>
          {this.props.loggedInUser && (
            <CardActions>
              <Button
                variant="contained"
                className={classes.button}
                disabled={this.state.direction === 1}
                onClick={() => this.handleVote(1)}
              >
                {this.state.direction === -1 ? "Bad Vote!" : "Good Article!"}
              </Button>
              <Button
                variant="contained"
                className={classes.button}
                disabled={this.state.direction === -1}
                onClick={() => this.handleVote(-1)}
              >
                {this.state.direction === 1 ? "Bad Vote!" : "Bad Article!"}
              </Button>
            </CardActions>
          )}
        </Card>
        <ArticleComments
          comment_count={comment_count}
          loggedInUser={this.props.loggedInUser}
          article_id={this.props.article_id}
        />
      </div>
    );
  }
}

export default withStyles(styles)(SingleArticle);

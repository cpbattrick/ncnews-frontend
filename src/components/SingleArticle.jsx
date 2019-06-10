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
    return (
      <div>
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="h2" className={classes.title}>
              {title}
            </Typography>
            <br />
            <Typography variant="h6">Topic: {topic}</Typography>
            <Typography variant="h6">Author: {author}</Typography>
            <Typography variant="h6">
              Article Votes: {votes + this.state.direction}
            </Typography>
            <br />
            <Typography variant="body1">{body}</Typography>
          </CardContent>
          {this.props.loggedInUser && (
            <div>
              <Button
                disabled={this.state.direction === 1}
                onClick={() => this.handleVote(1)}
              >
                {this.state.direction === -1 ? "Bad Vote!" : "Good Article!"}
              </Button>
              <Button
                disabled={this.state.direction === -1}
                onClick={() => this.handleVote(-1)}
              >
                {this.state.direction === 1 ? "Bad Vote!" : "Bad Article!"}
              </Button>
            </div>
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

// export default function SimpleCard() {

//   return (
//     <Card className={classes.card}>
//       <CardContent>
//         <Typography className={classes.title} color="textSecondary" gutterBottom>
//           Word of the Day
//         </Typography>
//         <Typography variant="h5" component="h2">
//           be
//           {bull}
//           nev
//           {bull}o{bull}
//           lent
//         </Typography>
//         <Typography className={classes.pos} color="textSecondary">
//           adjective
//         </Typography>
//         <Typography variant="body2" component="p">
//           well meaning and kindly.
//           <br />
//           {'"a benevolent smile"'}
//         </Typography>
//       </CardContent>
//       <CardActions>
//         <Button size="small">Learn More</Button>
//       </CardActions>
//     </Card>
//   );
// }

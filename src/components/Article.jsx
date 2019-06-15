import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link } from "@reach/router";
import format from "date-fns/format";

const styles = theme => ({
  card: {
    minWidth: 275,
    marginBottom: "10px"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  floated: {
    display: "column",
    float: "right"
  }
});

const AdapterLink = React.forwardRef((props, ref) => (
  <Link innerRef={ref} {...props} />
));

class Article extends React.Component {
  render() {
    const {
      classes,
      article: {
        author,
        comment_count,
        created_at,
        title,
        topic,
        votes,
        article_id
      }
    } = this.props;

    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography align="left" variant="h5" component="h2">
            {title}
          </Typography>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            {`By: ${author}`}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            {`Created on: ${format(created_at, "Do MMMM YYYY")}`}
          </Typography>
          <Typography variant="body2" component="p">
            {`Topic: ${topic}`}
          </Typography>
          <div className={classes.floated}>
            <Typography>{`Comments: ${comment_count}`}</Typography>
            <Typography>{`Votes: ${votes}`}</Typography>
          </div>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            color="light"
            component={AdapterLink}
            to={`/${article_id}`}
          >
            <Typography>Full Article</Typography>
          </Button>
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(styles)(Article);

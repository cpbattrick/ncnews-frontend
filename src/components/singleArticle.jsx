import React from "react";
import { getArticle } from "../api";
import ArticleComments from "./articleComments";
import { patchArticle } from "../api";
import Error from "./error";

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
      <div className="singlearticle">
        <h1>{title}</h1>
        <h2>Topic: {topic}</h2>
        <h3>Author: {author}</h3>
        <h4>Comment Count: {comment_count}</h4>
        <h4>Article Votes: {votes + this.state.direction}</h4>
        <article>{body}</article>
        {this.props.loggedInUser && (
          <div>
            <button
              disabled={this.state.direction === 1}
              onClick={() => this.handleVote(1)}
            >
              {this.state.direction === -1 ? "Bad Vote!" : "Good Article!"}
            </button>
            <button
              disabled={this.state.direction === -1}
              onClick={() => this.handleVote(-1)}
            >
              {this.state.direction === 1 ? "Bad Vote!" : "Bad Article!"}
            </button>
          </div>
        )}

        <ArticleComments
          loggedInUser={this.props.loggedInUser}
          article_id={this.props.article_id}
        />
      </div>
    );
  }
}

export default SingleArticle;

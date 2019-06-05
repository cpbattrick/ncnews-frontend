import React from "react";
import { getArticle } from "../api";
import ArticleComments from "./articleComments";
import CommentForm from './commentsForm'

class SingleArticle extends React.Component {
  state = {
    article: {}
  };

  componentDidMount() {
    getArticle(this.props.article_id).then(article => {
      this.setState({ article });
    });
  }

  render() {
    const { title, author, topic, comment_count } = this.state.article;
    return (
      <div>
        <h1>{title}</h1>
        <h2>Topic: {topic}</h2>
        <h3>Author: {author}</h3>
        <h4>Comment Count: {comment_count}</h4>
        {this.props.loggedInUser && <CommentForm article_id={this.props.article_id} loggedInUser={this.props.loggedInUser}/>}
        <ArticleComments article_id={this.props.article_id} />
      </div>
    );
  }
}

export default SingleArticle;

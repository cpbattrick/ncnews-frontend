import React from "react";
import ArticlesList from "./articles-list";
import { getArticles } from "../api";
import SortBar from './sortBar'

class ArticlesPage extends React.Component {
  state = {
    articles: [],
    query:{}
  };

  getArticlesByUser = () => {
    const username = "jessjelly";
    getArticles({ username }).then(articles => {
      this.setState({ articles });
    });
  };

  componentDidMount() {
    getArticles({}).then(articles => {
      this.setState({ articles });
    });
  }

  componentDidUpdate() {
    getArticles(this.state.query).then(articles => {
      this.setState({ articles });
    });
  }

setQuery = (query) => {
  this.setState({query})
}

  render() {
    return (
      <div>
        <button onClick={this.getArticlesByUser}>
          Get Some Dudes Articles
        </button>
        <SortBar setQuery={this.setQuery}/>
        <ArticlesList
          loggedInUser={this.props.loggedInUser}
          articles={this.state.articles}
        />
      </div>
    );
  }
}

export default ArticlesPage;

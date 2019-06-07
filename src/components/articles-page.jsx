import React from "react";
import ArticlesList from "./articles-list";
import { getArticles } from "../api";
import SortBar from "./sortBar";

class ArticlesPage extends React.Component {
  state = {
    articles: [],
    query: {},
    page: 1
  };

  // getArticlesByUser = () => {
  //   const username = "jessjelly";
  //   getArticles({ username }).then(articles => {
  //     this.setState({ articles });
  //   });
  // };

  componentDidMount() {
    getArticles({}).then(articles => {
      this.setState({ articles });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const query = this.state.query;
    query.p = this.state.page;
    getArticles(query).then(articles => {
      this.setState({ articles });
    });
  }

  setQuery = query => {
    this.setState({ query });
  };

  changePage = num => {
    this.setState(prevState => {
      return { page: prevState.page + num };
    });
  };

  render() {
    return (
      <div className="articlepage">
        <SortBar setQuery={this.setQuery} />
        <ArticlesList
          loggedInUser={this.props.loggedInUser}
          articles={this.state.articles}
        />
        {this.state.page > 1 && (
          <button
            onClick={() => {
              this.changePage(-1);
            }}
          >
            No! Backwards with haste, I wasn't finished browsing!
          </button>
        )}
        <button
          onClick={() => {
            this.changePage(1);
          }}
        >
          Next page stupid machine, these articles displease me!
        </button>
      </div>
    );
  }
}

export default ArticlesPage;

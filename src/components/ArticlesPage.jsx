import React from "react";
import ArticlesList from "./ArticlesList";
import { getArticles } from "../api";
import SortBar from "./SortBar";

class ArticlesPage extends React.Component {
  state = {
    articles: [],
    page: 1,
    article_count: 0,
    topic: "",
    sort_by: ""
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
    const query = {
      topic: this.state.topic,
      p: this.state.page,
      sort_by: this.state.sort_by
    };
    if (
      prevState.page !== this.state.page ||
      prevState.sort_by !== this.state.sort_by ||
      prevState.topic !== this.state.topic
    ) {
      getArticles(query).then(articles => {
        this.setState({ articles });
      });
    }
  }

  setQuery = (topic, sort) => {
    this.setState({ topic: topic, sort_by: sort });
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

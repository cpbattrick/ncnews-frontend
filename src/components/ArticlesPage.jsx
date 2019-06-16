import React from "react";
import ArticlesList from "./ArticlesList";
import { getArticles } from "../api";
import SortBar from "./SortBar";
import Button from "@material-ui/core/Button";

class ArticlesPage extends React.Component {
  state = {
    articles: [],
    page: 1,
    article_count: 0,
    topic: this.props.topic || "",
    sort_by: ""
  };

  componentDidMount() {
    getArticles({ topic: this.state.topic }).then(data => {
      this.setState({
        articles: data.data.articles,
        article_count: data.data.total_count
      });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const query = {
      topic: this.props.topic,
      p: this.state.page,
      sort_by: this.state.sort_by
    };
    if (
      prevState.page !== this.state.page ||
      prevState.sort_by !== this.state.sort_by ||
      prevProps.topic !== this.props.topic
    ) {
      getArticles(query).then(data => {
        this.setState({
          articles: data.data.articles,
          article_count: data.data.total_count
        });
      });
    }
  }

  setQuery = (topic, sort) => {
    this.setState({ topic: topic, sort_by: sort, page: 1 });
  };

  changePage = num => {
    this.setState(prevState => {
      return { page: prevState.page + num };
    });
  };

  render() {
    const pageCount = Math.ceil(+this.state.article_count / 10);
    return (
      <div className="articlepage">
        <SortBar setQuery={this.setQuery} />
        <ArticlesList
          loggedInUser={this.props.loggedInUser}
          articles={this.state.articles}
        />
        {this.state.page > 1 && (
          <Button
            variant="contained"
            color="light"
            onClick={() => {
              this.changePage(-1);
            }}
          >
            No! Backwards with haste, I wasn't finished browsing!
          </Button>
        )}
        <Button
          variant="contained"
          color="light"
          disabled={this.state.page === pageCount}
          onClick={() => {
            this.changePage(1);
          }}
        >
          Next page, these articles displease me!
        </Button>
      </div>
    );
  }
}

export default ArticlesPage;

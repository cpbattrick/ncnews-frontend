import React from "react";
import "./App.css";
import Header from "./components/header";
import ArticlesPage from "./components/articles-page";
import { Router } from "@reach/router";
import SingleArticle from "./components/singleArticle";
import Error from "./components/error";

class App extends React.Component {
  state = {
    loggedInUser: null
  };

  setUser = username => {
    this.setState({ loggedInUser: username });
  };

  render() {
    return (
      <div>
        <Header
          loginUser={this.setUser}
          logoutUser={() => this.setUser(null)}
        />
        <Router>
          <ArticlesPage loggedInUser={this.state.loggedInUser} path="/" />
          <SingleArticle
            loggedInUser={this.state.loggedInUser}
            path="/:article_id"
          />
          <Error default />
        </Router>
      </div>
    );
  }
}

export default App;

import React from "react";
import "./App.css";
import Header from "./components/Header";
import ArticlesPage from "./components/ArticlesPage";
import { Router } from "@reach/router";
import SingleArticle from "./components/SingleArticle";
import Error from "./components/Error";

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

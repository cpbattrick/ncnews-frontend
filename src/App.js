import React from "react";
import "./App.css";
import Header from "./components/Header";
import ArticlesPage from "./components/ArticlesPage";
import { Router } from "@reach/router";
import SingleArticle from "./components/SingleArticle";
import Error from "./components/Error";

class App extends React.Component {
  state = {
    loggedInUser: localStorage.getItem("loggedInUser") || null
  };

  setUser = username => {
    localStorage.setItem("loggedInUser", username);
    this.setState({ loggedInUser: username });
  };

  render() {
    const { loggedInUser } = this.state;
    return (
      <div>
        <Header
          loggedInUser={loggedInUser}
          loginUser={this.setUser}
          logoutUser={() => this.setUser(null)}
        />
        <Router>
          <ArticlesPage loggedInUser={loggedInUser} path="/" />
          <SingleArticle loggedInUser={loggedInUser} path="/:article_id" />
          <Error default />
        </Router>
      </div>
    );
  }
}

export default App;

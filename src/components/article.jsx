import React from "react";

class Article extends React.Component {
  render() {
    return (
      <div>
        <h3>{this.props.article.title}</h3>
      </div>
    );
  }
}

export default Article;

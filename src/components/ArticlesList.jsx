import React from "react";
import Article from "./Article";

const ArticlesList = props => {
  return (
    <div>
      {props.articles.map(article => (
        <Article article={article} key={`article${article.article_id}`} />
      ))}
    </div>
  );
};

export default ArticlesList;

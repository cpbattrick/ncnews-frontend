import React from "react";
import Article from "./article";
import { Link } from "@reach/router";

const ArticlesList = props => {
  return (
    <div>
      {props.articles.map(article => {
        return (
          <div key={`article${article.article_id}`}>
            <Article article={article} />
            <Link to={`/${article.article_id}`}>Full article, or is it?</Link>
          </div>
        );
      })}
    </div>
  );
};

export default ArticlesList;

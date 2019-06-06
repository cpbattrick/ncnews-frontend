import React from "react";
import Article from "./article";
import { Link } from "@reach/router";

const ArticlesList = props => {
  return (
    <div>
      {props.articles.map(article => {
        return (
          <div key={`article${article.article_id}`}>
            <Link to={`/${article.article_id}`}>
              <Article article={article} />
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default ArticlesList;

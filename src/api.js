import axios from "axios";

const baseUrl = "https://news-sprint.herokuapp.com/api";

export const getArticles = query => {
  return axios
    .get(`${baseUrl}/articles`, {
      params: query
    })
    .then(({ data: { articles } }) => {
      return articles;
    });
};

export const getUser = username => {
  return axios
    .get(`${baseUrl}/users/${username}`)
    .then(({ data: { user } }) => {
      return user;
    });
};

export const getArticle = id => {
  return axios
    .get(`${baseUrl}/articles/${id}`)
    .then(({ data: { article } }) => {
      return article;
    });
};

export const getCommentsByArticleId = articleId => {
  return axios
    .get(`${baseUrl}/articles/${articleId}/comments`)
    .then(({ data: { comments } }) => {
      return comments;
    });
};

export const postComment = (commentBody, article_id) => {
  return axios
  .post(`${baseUrl}/articles/${article_id}/comments`, commentBody)
  .then(({ data : { comment }}) => {return comment})
}

export const purgeComment = (comment_id) => {
  return axios
    .delete(`${baseUrl}/comments/${comment_id}`)
}
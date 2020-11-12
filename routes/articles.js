const articles = require('express').Router();
const { getArticles, createArticle, deleteArticle } = require('../controllers/articles');
const { validateCreateArticle, validateArticleId } = require('../middlewares/validate');

articles.get('/', getArticles);
articles.post('/', validateCreateArticle, createArticle);
articles.delete('/:articleId', validateArticleId, deleteArticle);

module.exports = articles;

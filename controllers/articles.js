const Article = require('../models/article');
const NotFoundError = require('../errors/not-found-err');
const RightsError = require('../errors/rights-err');
const BadRequestError = require('../errors/bad-request-err');

module.exports.getArticles = (req, res, next) => {
  Article.find({})
    .then((articles) => {
      if (!articles) {
        return next(new NotFoundError('Пока еще нет статей'));
      }
      return res.send({ data: articles });
    })
    .catch(next);
};

module.exports.createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  const owner = req.user._id;
  Article.create({
    keyword, title, text, date, source, link, image, owner,
  })
    .then((article) => {
      res.status(201).send({ data: article });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(`${Object.values(err.errors).map((error) => error.message).join(', ')}`));
      }

      return next(err);
    });
};

module.exports.deleteArticle = (req, res, next) => {
  Article.findById(req.params.articleId).select('+owner')
    .then((article) => {
      if (article === null) {
        return next(new NotFoundError('Статья не найдена'));
      }
      if (`${req.user._id}` !== `${article.owner}`) {
        return next(new RightsError('Это не вы добавили эту статью'));
      }
      return `${req.params.articleId}`;
    }).then((id) => {
      if (!id) return;
      Article.findByIdAndDelete(id)
        .then((data) => res.send({ data }))
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Невалидный id статьи'));
      }
      return next(err);
    });
};

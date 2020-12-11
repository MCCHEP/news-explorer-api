const { celebrate, Joi } = require('celebrate');
const { ObjectId } = require('mongoose').Types;
const validationLibrary = require('validator');

const validateCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'Минимальная длина поля name 2 символа',
        'string.max': 'Максимальная длина поля name 30 символов',
        'any.required': 'Поле "name" должно быть заполнено',
      }),
    email: Joi.string().email().required()
      .messages({
        'string.email': 'Поле "email" должно быть валидным адресом электронной почты',
        'any.required': 'Поле "email" должно быть заполнено',
      }),
    password: Joi.string().required().messages({
      'any.required': 'Поле "password" должно быть обязательно заполнено',
    }),
  }),
});

const validateLoginUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required()
      .messages({
        'string.email': 'Поле "email" должно быть валидным адресом электронной почты',
        'any.required': 'Поле "email" должно быть заполнено',
      }),
    password: Joi.string().required().messages({
      'any.required': 'Поле "password" должно быть обязательно заполнено',
    }),
  }),
});

const validateCreateArticle = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required().messages({
      'any.required': 'Поле "keyword" должно быть обязательно заполнено',
    }),
    title: Joi.string().required().messages({
      'any.required': 'Поле "title" должно быть обязательно заполнено',
    }),
    text: Joi.string().required().messages({
      'any.required': 'Поле "text" должно быть обязательно заполнено',
    }),
    date: Joi.string().required().messages({
      'any.required': 'Поле "date" должно быть обязательно заполнено',
    }),
    source: Joi.string().required().messages({
      'any.required': 'Поле "source" должно быть обязательно заполнено',
    }),
    link: Joi.string().required().custom((value, helpers) => {
      if (validationLibrary.isURL(value)) {
        return value;
      }
      return helpers.message('Поле link должно быть валидным url адресом');
    }),
    image: Joi.string().required().custom((value, helpers) => {
      if (validationLibrary.isURL(value)) {
        return value;
      }
      return helpers.message('Поле image должно быть валидным url адресом');
    }),
  }),
});

const validateArticleId = celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().required().custom((value, helpers) => {
      if (ObjectId.isValid(value)) {
        return value;
      }
      return helpers.message('Невалидный id');
    }),
  }),
});

module.exports = {
  validateCreateUser,
  validateLoginUser,
  validateCreateArticle,
  validateArticleId,
};

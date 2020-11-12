const mongoose = require('mongoose');
const validationLibrary = require('validator');

const articleSchema = mongoose.Schema({
  keyword: {
    type: String,
    required: [true, 'Поле keyword должно быть заполнено'],
  },
  title: {
    type: String,
    required: [true, 'Поле title должно быть заполнено'],
  },
  text: {
    type: String,
    required: [true, 'Поле text должно быть заполнено'],
  },
  date: {
    type: String,
    required: [true, 'Поле date должно быть заполнено'],
  },
  source: {
    type: String,
    required: [true, 'Поле source должно быть заполнено'],
  },
  link: {
    type: String,
    required: [true, 'Поле link должно быть заполнено'],
    validate: {
      validator: (url) => validationLibrary.isURL(url),
      message: (props) => `${props.value} неправильный формат ссылки!`,
    },
  },
  image: {
    type: String,
    required: [true, 'Поле image должно быть заполнено'],
    validate: {
      validator: (url) => validationLibrary.isURL(url),
      message: (props) => `${props.value} неправильный формат ссылки!`,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    select: false,
  },
});

module.exports = mongoose.model('article', articleSchema);

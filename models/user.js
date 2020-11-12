const mongoose = require('mongoose');
const validationLibrary = require('validator');
const bcrypt = require('bcryptjs');
const AuthorizationError = require('../errors/authorization-err.js');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Поле name должно быть заполнено'],
    minlength: [2, 'Поле name должно быть не короче 2ух символов'],
    maxlength: [30, 'Поле name должно быть не длиннее 2ух символов'],
  },
  email: {
    type: String,
    required: [true, 'Поле email должно быть заполнено'],
    unique: [true, 'Нельзя зарегистрироваться повторно с той же почтой'],
    validate: {
      validator(userEmail) {
        return validationLibrary.isEmail(userEmail);
      },
      message: (props) => `${props.value} неправильный формат email!`,
    },
  },
  password: {
    type: String,
    required: [true, 'Поле password должно быть заполнено'],
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new AuthorizationError('Неправильные почта или пароль'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new AuthorizationError('Неправильные почта или пароль'));
          }

          return user; // теперь user доступен
        });
    });
};

module.exports = mongoose.model('User', userSchema);

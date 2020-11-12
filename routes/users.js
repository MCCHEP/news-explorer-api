const users = require('express').Router();
const { getMyInfo } = require('../controllers/users');

users.get('/me', getMyInfo);

module.exports = users;

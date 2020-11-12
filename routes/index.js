const router = require('express').Router();
const users = require('./users');
const articles = require('./articles');
const auth = require('../middlewares/auth');
const { createUser, loginUser } = require('../controllers/users');
const { validateCreateUser, validateLoginUser } = require('../middlewares/validate');

router.post('/signup', validateCreateUser, createUser);
router.post('/signin', validateLoginUser, loginUser);
router.use(auth);
router.use('/users', users);
router.use('/articles', articles);

module.exports = router;

const router = require('express').Router();
const {
  signUpControll,
  signInControll,
  logOutControll,
  findUserSessionControll,
} = require('../controllers/authControl');

router.post('/signup', signUpControll);

router.post('/signin', signInControll);

router.get('/logout', logOutControll);

router.get('/:id', findUserSessionControll);

module.exports = router;

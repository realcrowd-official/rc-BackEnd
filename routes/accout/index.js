const express = require('express');

const router = express.Router();
const signIn = require('./signIn'),
  signOut = require('./signOut'),
  signUp = require('./signUp'),
  findAccount = require('./findAccount'),
  logOut = require('./logOut'),
  makerApply = require('./makerApply'),
  socialLogin = require('./socialLogin');

router.use('/signUp', signUp);
// router.use('/signOut', signOut);
// router.use('/findAccount', findAccount);
// router.use('/logIn', logIn);
// router.use('/logOut', logOut);
// router.use('/makerApply', makerApply);
router.use('/socialLogin', socialLogin);

module.exports = router;

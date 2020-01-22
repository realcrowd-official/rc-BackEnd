const express = require('express');

const router = express.Router();
const signIn = require('./signIn'),
  signOut = require('./signOut'),
  findAccount = require('./findAccount'),
  logIn = require('./logIn'),
  logOut = require('./logOut'),
  makerApply = require('./makerApply'),
  socialLogin = require('./socialLogin');

router.use('/signIn', signIn);
// router.use('/signOut', signOut);
// router.use('/findAccount', findAccount);
// router.use('/logIn', logIn);
// router.use('/logOut', logOut);
// router.use('/makerApply', makerApply);
router.use('/socialLogin', socialLogin);

module.exports = router;

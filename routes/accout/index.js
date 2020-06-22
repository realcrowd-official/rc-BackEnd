const express = require('express');

const router = express.Router();
const signIn = require('./signIn'),
  signOut = require('./signOut'),
  signUp = require('./signUp'),
  findAccount = require('./findAccount'),
  logOut = require('./logOut'),
  makerApply = require('./makerApply'),
  socialLogin = require('./socialLogin'),
  checkJWT = require('./checkJWT'),
  profile = require('./profile'),
  follow = require('./follow'),
  addr = require('./address');

router.use('/signUp', signUp);
router.use('/signIn', signIn);
// router.use('/signOut', signOut);
// router.use('/findAccount', findAccount);
// router.use('/logIn', logIn);
// router.use('/logOut', logOut);
// router.use('/makerApply', makerApply);
router.use('/socialLogin', socialLogin);
router.use('/checkJWT', checkJWT);
router.use('/profile', profile);
router.use('/follow', follow);
router.use('/address', addr);

module.exports = router;

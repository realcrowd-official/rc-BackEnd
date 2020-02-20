const express = require('express');

const router = express.Router();
const account = require('./accout');
const post = require('./post');

router.use('/account', account);
router.use('/post', post);

module.exports = router;

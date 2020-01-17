const express = require('express');

const router = express.Router();
const account = require('./accout');

router.use('/account', account);

module.exports = router;

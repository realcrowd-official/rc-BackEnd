const express = require('express');

const router = express.Router();
const signIn = require('./signIn');

router.use('/signIn', signIn);

module.exports = router;

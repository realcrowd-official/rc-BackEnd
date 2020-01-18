const express = require('express');

const router = express.Router();
const kakao = require('./kakao');

router.use('/kakao', kakao);

module.exports = router;

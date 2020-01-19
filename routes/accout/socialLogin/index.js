const express = require('express');

const router = express.Router();
const kakao = require('./kakao');
const naver = require('./naver');

router.use('/kakao', kakao);
router.use('/naver', naver);

module.exports = router;

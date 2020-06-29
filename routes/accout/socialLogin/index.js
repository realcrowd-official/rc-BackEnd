const express = require('express');

const router = express.Router();
const kakao = require('./kakao');
const naver = require('./naver');
const google = require('./google');
const facebook = require('./facebook');

router.use('/kakao', kakao);
router.use('/naver', naver);
router.use('/google', google);
router.use('/facebook', facebook);

module.exports = router;

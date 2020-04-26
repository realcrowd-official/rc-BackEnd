const router = require('express').Router();
const uploadImg = require('./uploadImg');
const getUrl = require('./geturl');

router.use('/uploadImg', uploadImg);
router.use('/geturl', getUrl);

module.exports = router;

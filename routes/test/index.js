const router = require('express').Router();
const uploadImg = require('./uploadImg');

router.use('/uploadImg', uploadImg);

module.exports = router;

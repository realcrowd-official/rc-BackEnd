const router = require('express').Router();
const crud = require('./crud');
const comment = require('./comment');

router.use('/crud', crud);
router.use('/comment', comment);

module.exports = router;

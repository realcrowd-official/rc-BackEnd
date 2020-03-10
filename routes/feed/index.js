const router = require('express').Router();
const crud = require('./crud');
const like = require('./like');

router.use('/crud', crud);
router.use('/like', like);

module.exports = router;

const router = require('express').Router();
const crud = require('./crud');

router.use('/crud', crud);

module.exports = router;

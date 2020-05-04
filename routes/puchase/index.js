const router = require('express').Router();
const check = require('./check');
const deal = require('./deal');

router.use('/check', check);
router.use('/deal', deal);

module.exports = router;

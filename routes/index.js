const express = require('express');

const router = express.Router();
const account = require('./accout');
const project = require('./project');
const feed = require('./feed');
const purchase = require('./puchase');
const test = require('./test');

router.use('/test', test);

router.use('/account', account);
router.use('/project', project);
router.use('/feed', feed);
router.use('/purchase', purchase);

module.exports = router;

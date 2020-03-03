const express = require('express');

const router = express.Router();
const account = require('./accout');
const project = require('./project');
const feed = require('./feed');
const test = require('./test');

router.use('/text', test);

router.use('/account', account);
router.use('/project', project);
router.use('/feed', feed);

module.exports = router;

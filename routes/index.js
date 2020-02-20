const express = require('express');

const router = express.Router();
const account = require('./accout');
const project = require('./project');

router.use('/account', account);
router.use('/project', project);

module.exports = router;

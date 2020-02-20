const router = require('express').Router();

const feed = require('./feed');
const project = require('./project');

router.use('/feed', feed);
router.use('/project', project);

module.exports = router;

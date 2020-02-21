/* eslint-disable no-unused-expressions */
const router = require('express').Router();
const { AuthMiddleware } = require('../../../lib/resolveJwt');

const { insertFundingPost } = require('../../../db/query/product');

router.use('/', AuthMiddleware);

router.get('/', (req, res) => {});

router.post('/', (req, res) => {
  const query = {
    title: req.body.title,
    dueDate: req.body.dueDate,
    targetAmount: req.body.targetAmount,
    story: req.body.story,
    rewardList: req.body.rewardList,
    useOid: req.decoded.oid
  };
  insertFundingPost(query)
    ? res.status(200).json({ statusCode: 200 })
    : res.status(200).json({ statusCode: 400 });
});

router.put('/', (req, res) => {});

router.delete('/', (req, res) => {});

module.exports = router;

/* eslint-disable no-unused-expressions */
const router = require('express').Router();
const { AuthMiddleware } = require('../../../lib/resolveJwt');

const {
  insertFundingPost,
  findFundingPostList
} = require('../../../db/query/product');

router.use('/save', AuthMiddleware);

router.get('/', async (req, res) => {
  const list = await findFundingPostList();
  console.log(list);
  list
    ? res.status(200).json({ statusCode: 200, listArray: list })
    : res.status(200).json({ statusCode: 400 });
});

router.post('/save', (req, res) => {
  const query = {
    title: req.body.title,
    dueDate: req.body.dueDate,
    targetAmount: req.body.targetAmount,
    story: req.body.story,
    rewardList: req.body.rewardList,
    userOid: req.decoded.oid
  };
  insertFundingPost(query)
    ? res.status(200).json({ statusCode: 200 })
    : res.status(200).json({ statusCode: 400 });
});

router.put('/', (req, res) => {});

router.delete('/', (req, res) => {});

module.exports = router;

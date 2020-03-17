const router = require('express').Router();
const { AuthMiddleware } = require('../../../lib/resolveJwt');

const {
  insertFundingPost,
  findFundingPostList,
  findSinglePost
} = require('../../../db/query/product');

router.use('/save', AuthMiddleware);

router.get('/', async (req, res) => {
  const list = await findFundingPostList();
  if (list) {
    res.status(200).json({ statusCode: 200, listArray: list });
  }
  else {
    res.status(200).json({ statusCode: 400 });
  }
});

router.get('/:pid', async (req, res) => {
  const item = await findSinglePost(req.params.pid);
  if (item) {
    res.status(200).json({ statusCode: 200, ans: item });
  }
  else {
    res.status(200).json({ statusCode: 400 });
  }
});

router.post('/save', (req, res) => {
  const query = {
    title: req.body.title,
    dueDate: req.body.dueDate,
    startDate: req.body.startDate,
    targetAmount: req.body.targetAmount,
    story: req.body.story,
    rewardList: req.body.rewardList,
    userOid: req.decoded.oid
  };
  if (insertFundingPost(query)) {
    res.status(200).json({ statusCode: 200 });
  }
  else {
    res.status(200).json({ statusCode: 400 });
  }
});

router.put('/', (req, res) => {});

router.delete('/', (req, res) => {});

module.exports = router;

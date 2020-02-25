const router = require('express').Router();
const { AuthMiddleware } = require('../../../lib/resolveJwt');

const { insertFeedPost, findFeedPostList } = require('../../../db/query/feed');

router.use('/save', AuthMiddleware);

router.get('/', async (req, res) => {
  const list = await findFeedPostList();
  if (list) {
    res.status(200).json({ statusCode: 200, listArray: list });
  }
  else {
    res.status(200).json({ statusCode: 400 });
  }
});

router.post('/save', (req, res) => {
  const query = {
    userOid: req.decoded.oid,
    fundingOid: req.body.fundingOid,
    content: req.body.content
  };
  if (insertFeedPost(query)) {
    res.status(200).json({ statusCode: 200 });
  }
  else {
    res.status(200).json({ statusCode: 400 });
  }
});

router.put('/', (req, res) => {});

router.delete('/', (req, res) => {});

module.exports = router;

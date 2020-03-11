const router = require('express').Router();
const { checkLike, pushLike, pullLike } = require('../../../db/query/feed');
const { AuthMiddleware } = require('../../../lib/resolveJwt');

router.use('/', AuthMiddleware);

router.put('/', async (req, res) => {
  let likeLength = 0;
  if (await checkLike(req.body.id, req.decoded.oid)) {
    try {
      likeLength = await pullLike(req.body.id, req.decoded.oid);
    }
    catch (error) {
      res.status(200).json({ statusCode: 400 });
    }
    res.status(200).json({ statusCode: 200, ans: 'dislike', length: likeLength });
  }
  else {
    try {
      likeLength = await pushLike(req.body.id, req.decoded.oid);
    }
    catch (error) {
      res.status(200).json({ statusCode: 400 });
    }
    res.status(200).json({ statusCode: 200, ans: 'like', length: likeLength });
  }
});

module.exports = router;

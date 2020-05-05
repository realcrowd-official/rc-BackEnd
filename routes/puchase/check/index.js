const router = require('express').Router();
const { AuthMiddleware } = require('../../../lib/resolveJwt');
const { checkLeftItem } = require('../../../db/query/product');

router.use('/', AuthMiddleware);

router.post('/', async (req, res) => {
  const ans = await checkLeftItem(req.body.pId, req.body.iId);
  if (ans) {
    res.status(200).json({ statusCode: 200, ans: 'success' });
  }
  else {
    res.status(200).json({ statusCode: 401, ans: 'fail' });
  }
});

module.exports = router;

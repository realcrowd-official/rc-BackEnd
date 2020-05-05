const router = require('express').Router();
const { AuthMiddleware } = require('../../../lib/resolveJwt');
const { reservateItem } = require('../../../db/query/product');

router.use('/', AuthMiddleware);

router.post('/', async (req, res) => {
  const query = {
    uId: req.body.uid,
    pId: req.body.pid,
    iId: req.body.iId,
    uAddress: req.body.address,
    uComment: req.body.comment,
    uPhone: req.body.phone,
    uEmail: req.body.email
  };
  const ans = await reservateItem(query);
  if (!ans) {
    res.status(200).json({ statusCode: 200, ans: 'success' });
  }
  else {
    res.status(200).json({ statusCode: 401, ans: 'fail' });
  }
});

module.exports = router;

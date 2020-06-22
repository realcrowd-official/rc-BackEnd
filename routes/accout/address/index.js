const router = require('express').Router();
const { AuthMiddleware } = require('../../../lib/resolveJwt');
const { saveAddr, getAddr } = require('../../../db/query/account');

router.use('/', AuthMiddleware);
router.get('/', async (req, res) => {
  const ans = await getAddr(req.decoded.oid);
  if (ans) {
    res.status(200).json({ statusCode: 200, data: ans });
  }
  else {
    res.status(200).json({ statusCode: 403 });
  }
});
router.post('/', async (req, res) => {
  const query = {
    uid: req.decoded.oid,
    addrName: req.body.addrName,
    addr: req.body.addr,
    primary: req.body.primary
  };
  const answer = await saveAddr(query);
  if (answer) {
    res.status(200).json({ statusCode: 200, ans: answer });
  }
  else {
    res.status(200).json({ statusCode: 403, ans: 'fail' });
  }
});

module.exports = router;

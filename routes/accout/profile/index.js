const router = require('express').Router();
const { selectProfile } = require('../../../db/query/account');
const { AuthMiddleware } = require('../../../lib/resolveJwt');

router.use('/', AuthMiddleware);

router.get('/', async (req, res) => {
  const profile = await selectProfile(req.decoded.oid);
  if (profile) {
    res.status(200).json({ statusCode: 200, profileInfo: profile });
  }
  else {
    res.status(200).json({ statusCode: 400 });
  }
});

module.exports = router;

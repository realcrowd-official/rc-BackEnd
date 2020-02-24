/* eslint-disable no-unused-expressions */
const router = require('express').Router();
const { AuthMiddleware } = require('../../../lib/resolveJwt');
const { signInJwt } = require('../../../lib/encodeJwt');

router.use(AuthMiddleware);

router.get('/', async (req, res) => {
  const now = Date.now() / 1000;
  req.decoded.exp - now < 60 * 60 * 24 * 30
    ? res.json({
      statusCode: 201,
      ans: await signInJwt({
        id: req.decoded.id,
        nickname: req.decoded.nickName,
        email: req.decoded.email,
        oid: req.decoded.oid
      })
    })
    : res.json({ statusCode: 200 });
});

module.exports = router;

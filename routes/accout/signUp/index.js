const router = require('express').Router();

const authMiddleWare = require('../../../lib/resolveJwt').signUpAuthMiddleware;
const { signUpJwt } = require('../../../lib/encodeJwt');

const { signUp, checkNickName } = require('../../../db/query/account');

router.use('/', authMiddleWare);

router.post('/', async (req, res) => {
  const query = {
    id: req.decoded.id,
    nickname: req.body.nickname,
    name: req.body.name,
    phone: req.body.phone,
    email: req.decoded.email,
    social: req.decoded.social
  };

  // eslint-disable-next-line no-unused-expressions
  if (await checkNickName(req.body.nickname)) {
    res.status(200).json({ statusCode: 409, ans: 'nickname' });
  }
  else {
    // eslint-disable-next-line no-unused-expressions
    await signUp(query)
      ? res.status(200).json({
        statusCode: 201,
        ans: await signUpJwt({
          id: req.decoded.id, nickname: req.body.nickname, email: req.decoded.email
        })
      })
      : res.status(200).json({
        statusCode: 409,
        ans: 'token'
      });
  }
});

module.exports = router;

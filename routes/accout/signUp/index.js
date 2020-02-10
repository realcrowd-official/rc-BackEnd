const router = require('express').Router();

const authMiddleWare = require('../../../lib/resolveJwt').signUpAuthMiddleware;
const { signUpJwt } = require('../../../lib/encodeJwt');

const signUpSql = require('../../../db/query/account').signUp;

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
  await signUpSql(query) ? res.status(201).json({ ans: await signUpJwt({ id: req.decoded.id, nickname: req.body.nickname, email: req.decoded.email }) }) : res.status(409).json({ ans: 'fail' });
});

module.exports = router;

const router = require('express').Router();

const authMiddleWare = require('../../../lib/resolveJwt');

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
  await signUpSql(query) ? res.status(201).json({ ans: 'success' }) : res.status(409);
});

module.exports = router;

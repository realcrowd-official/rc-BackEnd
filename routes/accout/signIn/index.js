const express = require('express');

const { signIn } = require('../../../db/query/account');
const { signInJwt } = require('../../../lib/encodeJwt');

const router = express.Router();

router.post('/', async (req, res) => {
  const returnSignIn = await signIn(req.body.id);
  res.status(200).json({
    statusCode: 201,
    ans: await signInJwt({
      id: returnSignIn.id, nickname: returnSignIn.nickName, email: returnSignIn.email
    })
  });
});

module.exports = router;

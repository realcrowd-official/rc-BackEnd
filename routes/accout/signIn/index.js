const express = require('express');

const accountQuery = require('../../../db/query/account');

const router = express.Router();

router.post('/', (req, res) => {
  const query = {
    id: req.body.id,
    passwd: req.body.passwd,
    scoial: false,
    nickName: req.body.nickName,
    tel: req.body.tel,
    maker: false
  };
  if (accountQuery.signIn(query)) {
    res.status(200).send('success');
  }
  else {
    res.status(200).send('fail');
  }
});

module.exports = router;

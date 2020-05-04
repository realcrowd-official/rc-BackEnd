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
  if(!ans){
    res.send(ans);
  }else{
      res.send('fail');
  }
  
});

module.exports = router;

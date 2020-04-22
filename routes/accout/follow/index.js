const router = require('express').Router();
const { AuthMiddleware } = require('../../../lib/resolveJwt');
const { follow, unFollow, checkFollow } = require('../../../db/query/account');

router.use('/', AuthMiddleware);

router.put('/', async (req, res) => {
  let ans = [];
  if (await checkFollow(req.body.oid, req.body.uid)) {
    try {
      ans = await unFollow(req.body.oid, req.body.uid);
      // console.log(ans);
    }
    catch (error) {
      res.status(200).json({ statusCode: 400 });
    }
    finally {
      res.status(200).json({ statusCode: 200, ans: 'unfollow', data: ans });
    }
  }
  else {
    try {
      ans = await follow(req.body.oid, req.body.uid);
      // console.log(ans);
    }
    catch (error) {
      res.status(200).json({ statusCode: 400 });
    }
    finally {
      res.status(200).json({ statusCode: 200, ans: 'follow', data: ans });
    }
  }
});

module.exports = router;

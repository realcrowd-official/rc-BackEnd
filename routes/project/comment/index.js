const router = require('express').Router();
const multer = require('multer');
const multerGoogleStorage = require('multer-google-storage');
const { AuthMiddleware } = require('../../../lib/resolveJwt');
const {
  saveComment,
  findCommentPid,
  saveCommunityComment,
  userCommunity,
  checkLike,
  likeCommunity,
  unLikeCommunity
} = require('../../../db/query/comment');

const uploadOption = multer({
  storage: multerGoogleStorage.storageEngine({
    bucket: process.env.googleStorageBucket,
    projectId: process.env.googleStorageId,
    keyFilename: process.env.googleKeyFile
  })
});

// router.use('/', );

router.post('/', AuthMiddleware, uploadOption.array('img', 5), async (req, res) => {
  const imgArray = [];
  await req.files.map((Data) => imgArray.push(Data.path));
  const query = {
    pid: req.body.pid,
    files: imgArray,
    content: req.body.content,
    uid: req.decoded.oid
  };
  if (await saveComment(query)) {
    res.status(200).json({ statusCode: 200 });
  }
  else {
    res.status(200).json({ statusCode: 403 });
  }
});

router.get('/', async (req, res) => {
  const ans = await findCommentPid({ pid: req.query.pid, start: parseInt(req.query.start, 10) });

  if (ans) {
    res.status(200).json({ statusCode: 200, data: ans });
  }
  else {
    res.status(200).json({ statusCode: 403 });
  }
});

router.post('/', AuthMiddleware, async (req, res) => {
  const query = {
    uid: req.decoded.oid,
    content: req.body.content,
    cid: req.body.cid
  };
  const ans = await saveCommunityComment(query);

  if (ans) {
    res.status(200).json({ statusCode: 200 });
  }
  else {
    res.status(200).json({ statusCode: 403 });
  }
});

router.get('/user', AuthMiddleware, async (req, res) => {
  const ans = await userCommunity({ uid: req.decoded.oid, start: parseInt(req.query.start, 10) });

  if (ans) {
    res.status(200).json({ statusCode: 200, list: ans });
  }
  else {
    res.status(200).json({ statusCode: 403 });
  }
});

router.put('/like', AuthMiddleware, async (req, res) => {
  let likeLength = 0;
  if (await checkLike(req.body.cid, req.decoded.oid)) {
    try {
      likeLength = await unLikeCommunity(req.body.cid, req.decoded.oid);
    }
    catch (error) {
      res.status(200).json({ statusCode: 400 });
    }
    res.status(200).json({ statusCode: 200, ans: 'dislike', length: likeLength });
  }
  else {
    try {
      likeLength = await likeCommunity(req.body.cid, req.decoded.oid);
    }
    catch (error) {
      res.status(200).json({ statusCode: 400 });
    }
    res.status(200).json({ statusCode: 200, ans: 'like', length: likeLength });
  }
});

module.exports = router;

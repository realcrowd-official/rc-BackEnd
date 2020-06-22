const router = require('express').Router();
const multer = require('multer');
const multerGoogleStorage = require('multer-google-storage');
const { AuthMiddleware } = require('../../../lib/resolveJwt');

const {
  insertFundingPost,
  findFundingPostList,
  findSinglePost,
  userFunding
} = require('../../../db/query/product');

const uploadOption = multer({
  storage: multerGoogleStorage.storageEngine({
    bucket: process.env.googleStorageBucket,
    projectId: process.env.googleStorageId,
    keyFilename: process.env.googleKeyFile
  })
});

router.use('/save', AuthMiddleware);

router.get('/', async (req, res) => {
  const list = await findFundingPostList();
  if (list) {
    res.status(200).json({ statusCode: 200, listArray: list });
  }
  else {
    res.status(200).json({ statusCode: 400 });
  }
});

router.get('/user', AuthMiddleware, async (req, res) => {
  const list = await userFunding({ uid: req.decoded.oid, start: parseInt(req.query.start, 10) });
  if (list) {
    res.status(200).json({ statusCode: 200, listArray: list });
  }
  else {
    res.status(200).json({ statusCode: 403 });
  }
});

router.get('/:pid', async (req, res) => {
  const item = await findSinglePost(req.params.pid);
  if (item) {
    res.status(200).json({ statusCode: 200, ans: item });
  }
  else {
    res.status(200).json({ statusCode: 400 });
  }
});

router.post('/save', uploadOption.single('img'), async (req, res) => {
  const rewardArray = [];
  await req.body.rewardList.map((Data) => rewardArray.push(JSON.parse(Data)));
  const query = {
    title: req.body.title,
    dueDate: req.body.dueDate,
    startDate: req.body.startDate,
    targetAmount: req.body.targetAmount,
    story: req.body.story,
    rewardList: rewardArray,
    userOid: req.decoded.oid,
    img: req.file.path
  };
  if (insertFundingPost(query)) {
    res.status(200).json({ statusCode: 200 });
  }
  else {
    res.status(200).json({ statusCode: 400 });
  }
});

router.put('/', (req, res) => {});

router.delete('/', (req, res) => {});

module.exports = router;

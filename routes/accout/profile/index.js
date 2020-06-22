const router = require('express').Router();
const multer = require('multer');
const multerGoogleStorage = require('multer-google-storage');

const { selectProfile, updateUserInfo, checkNickName } = require('../../../db/query/account');
const { AuthMiddleware } = require('../../../lib/resolveJwt');

const uploadOption = multer({
  storage: multerGoogleStorage.storageEngine({
    bucket: process.env.googleStorageBucket,
    projectId: process.env.googleStorageId,
    keyFilename: process.env.googleKeyFile
  })
});

router.use('/', AuthMiddleware);

router.get('/', async (req, res) => {
  const profile = await selectProfile(req.decoded.oid);
  if (profile) {
    res.status(200).json({ statusCode: 200, profileInfo: profile });
  }
  else {
    res.status(200).json({ statusCode: 400 });
  }
});

router.put('/', uploadOption.single('img'), async (req, res) => {
  const query = {
    name: req.body.name,
    nickName: req.body.nickName,
    email: req.body.email,
    phone: req.body.phone,
    infoMessage: req.body.infoMessage,
    thumNailPic: req.file ? req.file.path : null,
    uid: req.decoded.oid
  };
  const checkNick = await checkNickName(req.body.nickName);
  if (checkNick === req.decoded.oid || !checkNick) {
    const ans = await updateUserInfo(query);
    if (ans) {
      res.status(200).json({ statusCode: 200 });
    }
    else {
      res.status(200).json({ statusCode: 403 });
    }
  }
  else {
    res.status(200).json({ statusCode: 400, error: 'nickName' });
  }
});

module.exports = router;

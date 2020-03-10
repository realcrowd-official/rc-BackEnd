const router = require('express').Router();
const multer = require('multer');
const multerGoogleStorage = require('multer-google-storage');

const authMiddleWare = require('../../../lib/resolveJwt').signUpAuthMiddleware;
const { signInJwt } = require('../../../lib/encodeJwt');

const { signUp, checkNickName } = require('../../../db/query/account');

const uploadOption = multer({
  storage: multerGoogleStorage.storageEngine({
    bucket: process.env.googleStorageBucket,
    projectId: process.env.googleStorageId,
    keyFilename: process.env.googleKeyFile
  })
  // limits: { fileSize: 10 * 1024 * 1024 }
});

router.use('/', authMiddleWare);

router.post('/', uploadOption.single('img'), async (req, res) => {
  const query = {
    id: req.decoded.id,
    nickname: req.body.nickname,
    name: req.body.name,
    phone: req.body.phone,
    email: req.decoded.email ? req.decoded.email : '',
    social: req.decoded.social,
    thumNailPic: req.file ? req.file.path : null
  };
  if (await checkNickName(req.body.nickname)) {
    res.status(200).json({ statusCode: 409, ans: 'nickname' });
  }
  else {
    // eslint-disable-next-line no-unused-expressions
    await signUp(query)
      ? res.status(200).json({
        statusCode: 201,
        ans: 'success'
      })
      : res.status(200).json({
        statusCode: 409,
        ans: 'token'
      });
  }
});

module.exports = router;

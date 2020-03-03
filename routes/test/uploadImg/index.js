const router = require('express').Router();
const multer = require('multer');
const multerGoogleStorage = require('multer-google-storage');

const uploadOption = multer({
  storage: multerGoogleStorage.storageEngine({
    bucket: process.env.googleStorageBucket,
    projectId: process.env.googleStorageId,
    keyFilename: process.env.googleKeyFile
  }),
  limits: { fileSize: 10 * 1024 * 1024 }
});

router.post('/', uploadOption.single('img'), (req, res) => {
  res.json({ url: req.file.path });
});

module.exports = router;

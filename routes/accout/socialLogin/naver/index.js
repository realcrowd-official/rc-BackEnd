const router = require('express').Router();

const naverKey = {
  naverApi: process.env.naverApiClientId,
  naverApiKey: process.env.naverApiClientSecretPasswd,
  redirectURI: process.env.naverEncodedUrl
};

router.get('/login', (req, res) => {
  const naverApiUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${naverKey.naverApi}&redirect_uri=${naverKey.redirectURI}&state=state`;
  res.redirect(naverApiUrl);
});

router.get('/oauth', (req, res) => {
  const { code, state } = req.query;
  res.status(200).json({
    statusCode: 200,
    userCode: code
  });
});

module.exports = router;

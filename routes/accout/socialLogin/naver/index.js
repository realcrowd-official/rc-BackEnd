const router = require('express').Router();

const naverKey = {
  naverApi: process.env.naverApiClientId,
  naverApiKey: process.env.naverApiClientSecretPasswd,
  redirectURI: 'http://localhost:7777/api/account/socialLogin/naver/oauth'
};

router.get('/login', (req, res) => {
  const naverApiUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${naverKey.naverApi}&redirect_uri=${naverKey.redirectURI}&state=state`;
  res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
  res.end(`<a href='${naverApiUrl}'><img height='50' src='http://static.nid.naver.com/oauth/small_g_in.PNG'/></a>`);
});

router.get('/oauth', (req, res) => {
  const { code, state } = req.query;
  console.log(`code: ${code} state: ${state}`);
});

module.exports = router;

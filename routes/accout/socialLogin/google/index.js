const router = require('express').Router();

const googleKey = {
  googleApi: process.env.googleApi,
  googleApiClientId: process.env.googleApiClientId,
  googleApiClientSecretPasswd: process.env.googleApiClientSecretPasswd
};

router.get('/login', (req, res) => {
  const googleApiUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleKey.googleApiClientId}&redirect_uri=http://localhost:7777/api/account/socialLogin/google/oauth&scope=https://www.googleapis.com/auth/plus.login&response_type=code`;
  res.writeHead(200, { 'Content-type': 'text/html;charset=utf-8' });
  res.end(`<a href='${googleApiUrl}'><img height='50' src='http://static.nid.naver.com/oauth/small_g_in.PNG'/></a>`);
});

router.get('/oauth', (req, res) => {
  console.log(req.query.code);
});

module.exports = router;

/* eslint-disable consistent-return */
const router = require('express').Router();
const request = require('request-promise-native');
const cors = require('cors');

const kakaoKey = {
  kakaoApi: process.env.kakaoApi,
  kakaoApiSecret: process.env.kakaoApiScret,
  kakaoApiUri: process.env.kakaoApiUri
};
// console.log(kakaoOauthUri);
const getUserKakaoToken = async (kakaoAuthorizeCode) => {
  const getUserKakaoTokenForm = {
    grant_type: 'authorization_code',
    client_id: kakaoKey.kakaoApi,
    redirect_uri: kakaoKey.kakaoApiUri,
    code: kakaoAuthorizeCode,
    client_secret: kakaoKey.kakaoApiSecret
  };
  return request.post({
    url: 'https://kauth.kakao.com/oauth/token',
    headers: {
      'content-type': 'application:x-www-form-urlencoded',
      charset: 'utf-8'
    },
    form: getUserKakaoTokenForm
  }, (err) => {
    if (err) {
      return err;
    }
  }).then((value) => JSON.parse(value).access_token);
};

const getUserKakaoId = (userAccessToken) => request.post({
  url: 'https://kapi.kakao.com/v2/user/me',
  headers: {
    'content-type': 'application:x-www-form-urlencoded',
    Authorization: `Bearer ${userAccessToken}`
  }
  // form: ({ property_keys: ['kakao'] })
}, (err) => {
  if (err) {
    return err;
  }
}).then((value) => JSON.parse(value));

router.get('/login', cors(), (req, res) => {
  const kakaoOauthUri = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoKey.kakaoApi}&redirect_uri=http://localhost:7777/api/account/socialLogin/kakao/oauth&response_type=code`;
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELEETE, OPTIONS');
  res.header('Access-Control-Allow_headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  res.redirect(kakaoOauthUri);
});

router.get('/oauth', async (req, res) => {
  const userAccessToken = await getUserKakaoToken(req.query.code);
  // res.status(200).json({
  //   statusCode: 200,
  //   userCode: await getUserKakaoId(userAccessToken)
  // });
  res.redirect('http://localhost:3000');
});


module.exports = router;

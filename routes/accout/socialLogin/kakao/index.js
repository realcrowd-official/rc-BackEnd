const router = require('express').Router();
const request = require('request-promise-native');

const kakaoKey = {
  kakaoApi: process.env.kakaoApi,
  kakaoApiSecret: process.env.kakaoApiScret,
  kakaoApiUri: process.env.kakaoApiUri
};
// const kakaoOauthUri = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoKey.kakaoApi}&redirect_uri=http://localhost:7777/api/account/socialLogin/kakao/oauth&response_type=code`;
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
  },
  form: ({ property_keys: ['id'] })
}, (err) => {
  if (err) {
    return err;
  }
}).then((value) => JSON.parse(value).id);

router.get('/oauth', async (req) => {
  const userAccessToken = await getUserKakaoToken(req.query.code);
  console.log(await getUserKakaoId(userAccessToken));
});


module.exports = router;

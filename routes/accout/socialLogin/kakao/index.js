/* eslint-disable consistent-return */
const router = require('express').Router();
const request = require('request-promise-native');

const encodedJwt = require('../../../../lib/encodeJwt').signUpJwt;

const { checkId } = require('../../../../db/query/account');

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

router.get('/login', (req, res) => {
  const kakaoOauthUri = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoKey.kakaoApi}&redirect_uri=http://localhost:7777/api/account/socialLogin/kakao/oauth&response_type=code`;
  res.status(200).send(kakaoOauthUri);
});

router.get('/oauth', async (req, res) => {
  const userAccessToken = await getUserKakaoToken(req.query.code);
  const userAccessId = await getUserKakaoId(userAccessToken);
  const query = {
    id: userAccessId.id,
    nickName: userAccessId.kakao_account.profile.nickname,
    email: userAccessId.kakao_account.email && userAccessId.kakao_account.email,
    birthDay: userAccessId.kakao_account.birthday && userAccessId.kakao_account.birthday,
    social: 'kakao'
  };
  const token = await encodedJwt(query);
  // eslint-disable-next-line no-unused-expressions
  checkId(userAccessId.id) ? res.redirect(`http://localhost:3000/signIn?token=${token}`) : res.redirect(`http://localhost:3000/signUp?token=${token}`);
});


module.exports = router;

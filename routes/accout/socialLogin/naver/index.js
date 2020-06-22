const router = require('express').Router();
const request = require('request-promise-native');
const { checkId } = require('../../../../db/query/account');
const encodedJwt = require('../../../../lib/encodeJwt').signUpJwt;

const naverKey = {
  naverApi: process.env.naverApiClientId,
  naverApiKey: process.env.naverApiClientSecretPasswd,
  redirectURI: process.env.naverEncodedUrl
};

// const url = 'http://localhost:3000';
const url = 'dev.mircrowd.com';

const getToken = ({ code, state }) => {
  const apiUrl = `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${naverKey.naverApi}&client_secret=${naverKey.naverApiKey}&redirect_uri=${naverKey.redirectURI}&code=${code}&state=${state}`;
  const options = {
    url: apiUrl,
    headers: { 'X-Naver-Client-Id': naverKey.naverApi, 'X-Naver-Client-Secret': naverKey.naverApiKey }
  };
  return request.get(options, (err) => false).then((value) => JSON.parse(value).access_token);
};

const getUserId = (code) => {
  const apiUrl = 'https://openapi.naver.com/v1/nid/me';
  var options = {
    url: apiUrl,
    headers: { Authorization: `Bearer ${code}` }
  };
  return request.get(options, (err) => false).then((value) => JSON.parse(value).response);
};

router.get('/login', (req, res) => {
  const naverApiUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${naverKey.naverApi}&redirect_uri=${naverKey.redirectURI}&state=state`;
  res.status(200).send(naverApiUrl);
});

router.get('/oauth', async (req, res) => {
  const { code, state } = req.query;
  const userAccessToken = await getToken({ code, state });
  if (userAccessToken) {
    const userAccessId = await getUserId(userAccessToken);
    const query = {
      id: userAccessId.id,
      nickName: userAccessId.nickname,
      name: userAccessId.name,
      email: userAccessId.email,
      birthDay: userAccessId.birthday && userAccessId.birthday,
      social: 'naver'
    };
    const token = await encodedJwt(query.id, query.nickName, query.name, query.email, query.birthDay, 'naver');
    if (await checkId(userAccessId.id, 'naver')) {
      res.status(200).redirect(`${url}/signIn?token=${token}`);
    }
    else {
      res.status(200).redirect(`${url}/signUp?token=${token}`);
    }
  }
  else {
    res.status(200).json({
      statusCode: 400
    });
  }
});

module.exports = router;

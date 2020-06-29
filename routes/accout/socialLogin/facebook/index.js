const router = require('express').Router();
const request = require('request-promise-native');
const { checkId } = require('../../../../db/query/account');
const encodedJwt = require('../../../../lib/encodeJwt').signUpJwt;

const url = 'http://localhost:3000';
// const url = 'http://dev.mircrowd.com';

const fbKey = {
  fbApiId: process.env.facebookApiId,
  fbRedirctUrl: process.env.facebookApiUrl,
  fbSecretId: process.env.facebookApiSecret
};
const getToken = ({ code, state }) => {
  const apiUrl = `https://graph.facebook.com/v7.0/oauth/access_token?client_id=${fbKey.fbApiId}&redirect_uri=${fbKey.fbRedirctUrl}&client_secret=${fbKey.fbSecretId}&code=${code}`;
  return request.get(apiUrl, (err) => false).then((value) => JSON.parse(value));
};

const getAppToken = () => {
  const appTokenUrl = `https://graph.facebook.com/oauth/access_token?client_id=${fbKey.fbApiId}&client_secret=${fbKey.fbSecretId}&grant_type=client_credentials`;
  return request.get(appTokenUrl, (err) => false).then((value) => JSON.parse(value));
};

// const getUserId = async ({ uToken, aToken }) => {
//   const apiUrl = `https://graph.facebook.com/debug_token?input_token=${uToken}&access_token=${aToken}`;
//   return request.get(apiUrl, (err) => false).then((value) => JSON.parse(value));
// };

const getUserInfo = async ({ uToken }) => {
  const apiUrl = `https://graph.facebook.com/me?fields=id,name,email&access_token=${uToken}`;
  return request.get(apiUrl, (err) => false).then((value) => JSON.parse(value));
};

router.get('/login', (req, res) => {
  const fbApiUrl = `https://www.facebook.com/v7.0/dialog/oauth?client_id=${fbKey.fbApiId}&redirect_uri=${fbKey.fbRedirctUrl}&state=mir&auth_type=rerequest&scope=email`;
  res.status(200).send(fbApiUrl);
});

router.get('/oauth', async (req, res) => {
  const { code, state } = req.query;
  const userAccessToken = await getToken({ code, state });
  const appToken = await getAppToken();
  if (userAccessToken && appToken) {
    const userInfo = await getUserInfo({ uToken: userAccessToken.access_token });
    const token = await encodedJwt(userInfo.id, '', userInfo.name, userInfo.email, '', 'facebook');
    if (await checkId(userInfo.id, 'facebook')) {
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

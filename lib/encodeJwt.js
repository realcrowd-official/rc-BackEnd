const jwt = require('jsonwebtoken');

const signUpJwt = (query) => {
  const p = new Promise((resolve, reject) => {
    jwt.sign(
      {
        id: query.id,
        nickname: query.nickName,
        email: query.email,
        birthDay: query.birthDay,
        social: query.social
      },
      process.env.jwtSecret,
      {
        expiresIn: 60 * 60 * 30
      },
      (err, token) => {
        if (err) reject(err);
        resolve(token);
      }
    );
  });
  return p;
};

const signInJwt = (query) => {
  const p = new Promise((resolve, reject) => {
    jwt.sign(
      {
        id: query.id,
        nickname: query.nickName,
        email: query.email,
        oid: query.oid
      },
      process.env.jwtLoginSecret,
      {
        expiresIn: '30day'
      },
      (err, token) => {
        if (err) reject(err);
        resolve(token);
      }
    );
  });
  return p;
};

module.exports = { signUpJwt, signInJwt };

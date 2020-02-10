const jwt = require('jsonwebtoken');

module.exports = (query) => {
  const p = new Promise((resolve, reject) => {
    jwt.sign(
      {
        id: query.id,
        nickname: query.nickName,
        email: query.email,
        birthDay: query.birthDay
      },
      process.env.jwtSecret,
      {
        expiresIn: 60 * 30
      },
      (err, token) => {
        if (err) reject(err);
        resolve(token);
      }
    );
  });
  return p;
};

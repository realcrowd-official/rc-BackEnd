const jwt = require('jsonwebtoken');

module.exports = (query) => {
  const p = new Promise((resolve, reject) => {
    jwt.sign(
      {
        id: query.id,
        name: query.name,
        tel: query.tel
      },
      process.env.jwtSecret,
      {
        expiresIn: '6m',
        subject: 'userInfo'
      },
      (err, token) => {
        if (err) reject(err);
        resolve(token);
      }
    );
  });
  return p;
};

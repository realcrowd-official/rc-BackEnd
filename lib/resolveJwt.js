const jwt = require('jsonwebtoken');

// eslint-disable-next-line consistent-return
const signUpAuthMiddleware = (req, res, next) => {
  // read the token from header or url
  const token = req.headers['x-access-token'] || req.body.token;

  // token does not exist
  if (!token) {
    return res.status(403).json({
      success: false,
      message: 'not logged in'
    });
  }

  // create a promise that decodes the token
  const p = new Promise((resolve, reject) => {
    jwt.verify(token, process.env.jwtSecret, (err, decoded) => {
      if (err) reject(err);
      resolve(decoded);
    });
  });

  // if it has failed to verify, it will return an error message
  const onError = (error) => {
    res.status(403).json({
      success: false,
      message: error.message
    });
  };
  // process the promise
  p.then((decoded) => {
    req.decoded = decoded;
    next();
  }).catch(onError);
};

// eslint-disable-next-line consistent-return
const AuthMiddleware = (req, res, next) => {
  // read the token from header or url
  const token = req.headers['x-access-token'] || req.body.token;

  // token does not exist
  if (!token) {
    return res.status(200).json({
      statusCode: 403,
      success: false,
      message: 'not logged in'
    });
  }

  // create a promise that decodes the token
  const p = new Promise((resolve, reject) => {
    jwt.verify(token, process.env.jwtLoginSecret, (err, decoded) => {
      if (err) reject(err);
      resolve(decoded);
    });
  });

  // if it has failed to verify, it will return an error message
  const onError = (error) => {
    res.status(200).json({
      statusCode: 403,
      success: false,
      message: error.message
    });
  };
  // process the promise
  p.then((decoded) => {
    req.decoded = decoded;
    next();
  }).catch(onError);
};

module.exports = { signUpAuthMiddleware, AuthMiddleware };

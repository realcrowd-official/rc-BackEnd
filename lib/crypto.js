const crypto = require('crypto');

module.exports = (passwd) => {
  const encryted = crypto.createHmac('sha1', process.env.cryptoSecret)
    .update(passwd)
    .digest('base64');
  return encryted;
};

const express = require('express');

const router = express.Router();

router.post('/', (req, res) => {
  console.log(req.body.id);
  res.send('working');
});

router.get('/', (req, res) => {
  res.send('api');
});

module.exports = router;

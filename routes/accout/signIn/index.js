const express = require('express');

const router = express.Router();

router.post('/', (req, res) => {
  console.log(req.body.id);
  res.send('working');
});

module.exports = router;

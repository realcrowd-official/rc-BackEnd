const router = require('express').Router();

router.get('/', (req, res) => {
  console.log(req.get('origin'));
});

module.exports = router;

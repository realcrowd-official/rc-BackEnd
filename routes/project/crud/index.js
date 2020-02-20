const router = require('express').Router();
const { AuthMiddleware } = require('../../../lib/resolveJwt');

// router.use('/', AuthMiddleware);

router.get('/', (req, res) => {});

router.post('/', (req, res) => {
  const query = {
    title: req.body.title,
    dueDate: req.body.dueDate,
    targetAmount: req.body.targetAmount,
    story: req.body.story,
    rewardList: req.body.rewardList
  };
  console.log(typeof query.rewardList);
});

router.put('/', (req, res) => {});

router.delete('/', (req, res) => {});

module.exports = router;

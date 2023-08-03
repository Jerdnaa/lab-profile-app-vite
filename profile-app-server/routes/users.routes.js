const User = require('../models/User.model');
const router = require('express').Router();

router.get('/', (req, res) => {
  res.json('All good in api');
});

router.post('/upload', async (req, res) => {
  const payload = req.body;
  try {
    // const image = await User.
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

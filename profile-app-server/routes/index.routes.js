const router = require('express').Router();

router.get('/', (req, res, next) => {
  res.json('All good in here');
});

const usersRoutes = require('./users.routes');
router.use('/users', usersRoutes);

module.exports = router;

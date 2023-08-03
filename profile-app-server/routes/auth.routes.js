const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User.model');
const { isAuthenticated } = require('../middlewares/jwt.middleware');

router.get('/', (req, res) => {
  res.json('All good in auth');
});

router.post('/signup', async (req, res) => {
  const payload = req.body;
  const salt = bcrypt.genSaltSync(13);
  const passwordHash = bcrypt.hashSync(payload.password, salt);
  try {
    await User.create({
      username: payload.username,
      email: payload.email,
      password: passwordHash,
      campus: payload.campus,
      course: payload.course,
    });
    res.status(201).json({ message: 'User Created' });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.post('/login', async (req, res) => {
  const payload = req.body;
  try {
    const potentialUser = await User.findOne({ email: payload.email });
    if (potentialUser) {
      const doPasswordMatch = bcrypt.compareSync(
        payload.password,
        potentialUser.password
      );
      if (doPasswordMatch) {
        const authToken = jwt.sign(
          { userId: potentialUser._id },
          process.env.TOKEN_SECRET,
          {
            algorithm: 'HS256',
            expiresIn: '6h',
          }
        );
        res.status(202).json({ token: authToken });
      } else {
        res.status(403).json({ errMessage: 'Invalid password' });
      }
    } else {
      res.status(404).json({ errMessage: 'No user found' });
    }
  } catch (error) {
    console.log(error);
  }
});

router.get('/verify', isAuthenticated, (req, res) => {
  console.log(req.auth);
  res.json('ok');
});

module.exports = router;

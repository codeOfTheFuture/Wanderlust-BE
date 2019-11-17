const router = require('express').Router();
const bcrypt = require('bcryptjs');

const generateToken = require('./token');

const Users = require('../users/user-model');

// Register a new user
router.post('/register', async (req, res) => {
  const user = req.body;

  if (!user.username || !user.password || !user.isTourGuide) {
    return res.status(400).json({ message: 'Please provide all fields' });
  }

  const hashPassword = bcrypt.hashSync(user.password, 14);

  user.password = hashPassword;

  try {
    if (user.isTourGuide) {
      const guide = await Users.addGuide(user);
      const token = generateToken(guide);
      res.status(201).json({ guide, token });
    }
  } catch (err) {
    res.status(500).json(`Internal Server Error`, err);
  }
});

// Login a user
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: `Please include username and password` });
  }

  try {
    const guide = await Users.findGuideBy({ username });
    const tourist = await Users.findTouristBy({ username });

    console.log('route', guide);
    if (guide && bcrypt.compareSync(password, guide.password)) {
      const token = generateToken(guide);

      const {
        id,
        username,
        isTourGuide,
        email,
        firstname,
        lastname,
        phonenumber,
      } = guide;

      return res.status(200).json({
        guide: {
          id,
          username,
          isTourGuide,
          email,
          firstname,
          lastname,
          phonenumber,
        },
        token,
      });
    } else if (tourist && bcrypt.compareSync(password, tourist.password)) {
      const token = generateToken(tourist);

      return res.status(200).json({ tourist, token });
    } else {
      return res.status(404).json({ message: `User ${username} not found` });
    }
  } catch (err) {
    res.status(500).json({ message: `Internal Server Error`, err });
  }
});

module.exports = router;

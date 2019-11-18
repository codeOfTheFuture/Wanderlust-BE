const router = require('express').Router();
const User = require('./user-model');

// Create / update a guide account
router.put('/:id', async (req, res) => {
  const {
    params: { id },
    body,
  } = req;

  try {
    const guide = await User.findGuideById(id);

    if (!guide) {
      return res.status(404).json({ message: `User not found` });
    }

    await User.updateGuide(id, body);

    const updatedGuide = await User.findGuideById(id).select(
      'id',
      'username',
      'email',
      'firstname',
      'lastname',
      'phonenumber',
    );

    res.status(200).json(updatedGuide);
  } catch (err) {
    res.status(500).json({ message: `Internal Server Error`, err });
  }
});

// Get a guide by id
router.get('/:id', async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    const guide = await User.findGuideById(id).select(
      'id',
      'username',
      'email',
      'firstname',
      'lastname',
      'phonenumber',
    );

    if (!guide) {
      return res.status(404).json({ message: `User not found` });
    }

    res.status(200).json(guide);
  } catch (err) {
    res.status(500).json({ message: `Internal Server Error`, err });
  }
});

module.exports = router;

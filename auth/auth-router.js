const router = require("express").Router();
const isAuthenticated = require("./auth-middleware");

const Users = require("../users/user-model");

// Register a new user
router.post("/register", isAuthenticated, async (req, res) => {
  const { uid, email } = req.user;
  const {
    displayName,
    phoneNumber,
    photoURL,
    creationTime,
    lastSignInTime,
  } = req.body.userInfo;

  const newUser = {
    uid,
    email,
    displayName,
    phoneNumber,
    photoURL,
    creationTime,
    lastSignInTime,
  };

  try {
    const result = await Users.addUser(newUser);

    console.log("addUser: result>>", result);
    return res.status(201).json(result);
    // }
  } catch (error) {
    return res.status(500).json(`Internal Server Error`, error);
  }
});

// Login a user
router.post("/login", isAuthenticated, async (req, res) => {
  const { uid } = req.user;

  if (!uid) {
    return res.status(400).json({ message: "Uid does not exist" });
  }

  try {
    const user = await Users.findUserByUid(uid);

    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ message: `Internal Server Error`, err });
  }
});

module.exports = router;

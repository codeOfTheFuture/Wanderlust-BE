const router = require("express").Router();
const bcrypt = require("bcryptjs");
const isAuthenticated = require("./auth-middleware");
// const generateToken = require("./token");

const Users = require("../users/user-model");

// Register a new user
router.post("/register", isAuthenticated, async (req, res) => {
  const { uid, email } = req.user;
  console.log("uid: ", uid, "email: ", email);

  try {
    console.log("findUser: ");
    const newUser = await Users.addUser({ uid: uid, email });

    return res.status(201).json({ message: "User Created", newUser });
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
    const user = await Users.findUserById(uid);

    delete user.id;
    console.log("working", user);
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ message: `Internal Server Error`, err });
  }
});

module.exports = router;

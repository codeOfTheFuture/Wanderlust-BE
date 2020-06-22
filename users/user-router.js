const router = require("express").Router();
const Users = require("./user-model");
const Tours = require("../tours/tours-model");
const isAuthenticated = require("../auth/auth-middleware");

// const multer = require("multer");
// const upload = multer({ dest: "uploads" });

// Get a user by id
router.get("/userId", isAuthenticated, async (req, res) => {
  const { uid } = req.user;
  console.log("router uid: >>>>>", uid);
  try {
    const user = await Users.findUserById(uid);

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: "User not found", error });
  }
});

// Get a single guides tours
router.get("/offered-tours", isAuthenticated, async (req, res) => {
  const { uid } = req.user;
  console.log("in the tour-router>>>>>>>: ");
  try {
    const tours = await Tours.getOfferedTours(uid);
    console.log("single guide tours>>>>>: ", tours);
    res.status(200).json(tours);
  } catch (error) {
    res.status(500).json({ message: "Error fetching the tours", error });
  }
});

// Update a user account
router.put("/update/user", isAuthenticated, async (req, res) => {
  const { uid } = req.user;
  const userData = req.body;

  console.log("uid in update>>>>", uid);
  console.log("userData in update>>>>>", userData);

  try {
    const user = await Users.findUserById(uid);

    if (!user) {
      return res.status(400).json({ message: "Could not find user" });
    }
    console.log("user in update>>>>", user);
    const updatedUser = await Users.updateUser(uid, userData);

    res.status(200).json({ message: "User successfully updated", updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
});

module.exports = router;

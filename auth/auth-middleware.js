const admin = require("firebase-admin");

const serviceAccount = require("../wanderlust-4a7a5-firebase-adminsdk-r9zk9-5377e19ff7.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://wanderlust-4a7a5.ifrebaseio.com",
});

module.exports = async (req, res, next) => {
  const idToken = req.headers.authorization;
  try {
    const { uid, email } = await admin.auth().verifyIdToken(idToken);

    // console.log("uid: ", uid, "email: ", email);

    req.user = { uid, email };
    next();
  } catch (error) {
    res.status(401).json({ message: "Token not valid", error });
  }
};

// const jwt = require('jsonwebtoken');
// const secrets = require('../config/secrets');

// module.exports = (req, res, next) => {
//   const token = req.headers.authorization;

//   if (token) {
//     jwt.verify(token, secrets.jwtSecret, (error, decodedToken) => {
//       if (error) {
//         res.status(401).json({ message: `You are Unauthorized` });
//       } else {
//         req.user = decodedToken;
//         // if (!req.user.isTourGuide) {
//         //   res
//         //     .status(401)
//         //     .json({ message: `You are not registered as a guide` });
//         // } else {
//         //   console.log(req.user);
//         next();
//         // }
//       }
//     });
//   }
// };

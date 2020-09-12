// const jwt = require('jsonwebtoken');
// const secret = require('../config/secrets');

// module.exports = user => {
//   const jwtPayload = {
//     subject: user.id,
//     username: user.username,
//     isTourGuide: user.isTourGuide,
//   };

//   const jwtSecret = secret.jwtSecret;

//   const jwtOptions = {
//     expiresIn: '1d',
//   };

//   return jwt.sign(jwtPayload, jwtSecret, jwtOptions);
// };

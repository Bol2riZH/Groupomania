'use strict';

const validator = require('validator');

module.exports = (req, res) => {
  if (!validator.isEmail(req.body.email)) {
    return res
      .status(400)
      .json({ status: 'fail', message: 'email format incorrect' });
  }
  if (!validator.isStrongPassword(req.body.password)) {
    return res.status(400).json({
      status: 'fail',
      message:
        'password must contain at least 8 characters, must have at least 1 capital letter, one number and one special character',
    });
  }
  if (req.body.password !== req.body.confirmPassword) {
    return res
      .status(400)
      .json({
        status: 'fail',
        message: 'password and password confirmation must be same',
      });
  } else return false;
};

// module.exports = (email, password, confirmPassword, res) => {
//   if (!validator.isEmail(email)) {
//     return res
//         .status(400)
//         .json({ status: 'fail', message: 'email format incorrect' });
//   }
//   if (!validator.isStrongPassword(password)) {
//     return res.status(400).json({
//       status: 'fail',
//       message:
//           'password must contain at least 8 characters, must have at least 1 capital letter, one number and one special character',
//     });
//   }
//   if (password !== confirmPassword) {
//     return res
//         .status(400)
//         .json({ status: 'fail', message: 'password must be same' });
//   } else return false;
// };

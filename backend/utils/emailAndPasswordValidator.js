'use strict';

const validator = require('validator');

module.exports = (res, email, password) => {
  if (!validator.isEmail(email)) {
    return res
      .status(400)
      .json({ status: 'fail', message: 'email format incorrect' });
  }
  if (!validator.isStrongPassword(password)) {
    return res.status(400).json({
      status: 'fail',
      message:
        'password must contain at least 8 characters, must have at least 1 capital letter, one number and one special character',
    });
  } else return false;
};

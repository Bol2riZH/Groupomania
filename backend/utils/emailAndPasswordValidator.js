'use strict';

const validator = require('validator');

module.exports = (req) => {
  return !(
    !validator.isEmail(req.body.email) ||
    req.body.email !== req.body.confirmEmail ||
    !validator.isStrongPassword(req.body.password) ||
    req.body.password !== req.body.confirmPassword
  );
};

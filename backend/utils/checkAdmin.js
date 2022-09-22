'use strict';

const User = require('../models/User');

module.exports = async (req) => {
  const user = await User.findById(req.auth.userId);
  return user.role === 'admin';
};

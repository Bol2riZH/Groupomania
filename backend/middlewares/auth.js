'use strict';

const jwt = require('jsonwebtoken');
require('dotenv').config();

const catchAsync = require('../utils/catchAsync');
const User = require('../models/User');

module.exports = catchAsync(async (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
  const userId = decodedToken.userId;
  const admin = await User.findById(userId);
  if (admin)
    req.auth = {
      userId: userId,
      role: admin.role,
    };
  else {
    req.auth = {
      userId: userId,
      role: 'user',
    };
  }
  next();
});

'use strict';

const jwt = require('jsonwebtoken');
require('dotenv').config();

const catchAsync = require('../utils/catchAsync');

module.exports = catchAsync(async (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
  const userId = decodedToken.userId;
  req.auth = {
    userId: userId,
  };
  next();
});

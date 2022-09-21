'use strict';

const catchAsync = require('./catchAsync');

module.exports = (user) => {
  return {
    username: user.username,
    profilePictureUrl: user.profilePictureUrl,
  };
};

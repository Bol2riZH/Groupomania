'use strict';

const catchAsync = require('./catchAsync');

module.exports = (user) => {
  return {
    username: user.username,
    profilPictureUrl: user.profilPictureUrl,
  };
};

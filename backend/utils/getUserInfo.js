'use strict';

module.exports = (user) => {
  return {
    username: user.username,
    profilePictureUrl: user.profilePictureUrl,
  };
};

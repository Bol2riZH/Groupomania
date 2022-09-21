'use strict';

const fs = require('fs');

exports.findAndUnlinkPostImage = (Post, directory) => {
  const filename = Post.imageUrl.split(`images/${directory}/`)[1];
  fs.unlink(`images/${directory}/${filename}`, () => {});
};

exports.findAndUnlinkProfilePicture = (User) => {
  const filename = User.profilePictureUrl.split(`images/profilePictures/`)[1];
  fs.unlink(`images/profilePictures/${filename}`, () => {});
};

'use strict';

const fs = require('fs');

exports.findAndUnlinkPostImage = (Post) => {
  const filename = Post.imageUrl.split(`images/posts/`)[1];
  fs.unlink(`images/posts/${filename}`, () => {});
};

exports.findAndUnlinkProfilePicture = (User) => {
  const filename = User.profilePictureUrl.split(`images/profilePictures/`)[1];
  fs.unlink(`images/profilePictures/${filename}`, () => {});
};

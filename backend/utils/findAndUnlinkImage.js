'use strict';

const fs = require('fs');

exports.findAndUnlinkPostImage = async (Post, directory) => {
  const filename = Post.imageUrl.split(`images/${directory}/`)[1];
  fs.unlink(`images/${directory}/${filename}`, () => {});
};

exports.findAndUnlinkProfilePicture = async (User, directory) => {
  const filename = User.profilPictureUrl.split(`images/${directory}/`)[1];
  fs.unlink(`images/${directory}/${filename}`, () => {});
};

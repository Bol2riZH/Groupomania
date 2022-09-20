'use strict';

const fs = require('fs');

exports.findAndUnlinkPostImage = async (Model, id, directory) => {
  const getModel = await Model.findById(id);
  const filename = getModel.imageUrl.split(`images/${directory}/`)[1];
  fs.unlink(`images/${directory}/${filename}`, () => {});
};

exports.findAndUnlinkProfilePicture = async (Model, id, directory) => {
  const getModel = await Model.findById(id);
  const filename = getModel.profilePictureUrl.split(`images/${directory}/`)[1];
  fs.unlink(`images/${directory}/${filename}`, () => {});
};

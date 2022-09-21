'use strict';

const multer = require('multer');
require('dotenv').config();

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
};

const storage = (destination) => {
  return multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `./images/${destination}`);
    },
    filename: (req, file, cb) => {
      const name = file.originalname
        .split(' ')
        .join('_')
        .split('.')
        .slice(0, -1)
        .join('.');
      const extension = MIME_TYPES[file.mimetype];
      cb(null, `${name}${Date.now()}.${extension}`);
    },
  });
};

/*////////////////////////////////////*/
/*TODO : process.env.xxx doesn't work*/
/*//////////////////////////////////*/
exports.profilePictureMulter = multer({
  storage: storage('profilePictures'),
  limits: { fileSize: 1000000 },
}).single('profilePictureUrl');

exports.postMulter = multer({
  storage: storage('posts'),
  limits: { fileSize: 5000000 },
}).single('imageUrl');

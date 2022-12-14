'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('../models/User');

const catchAsync = require('../utils/catchAsync');
const emailAndPasswordValidator = require('../utils/emailAndPasswordValidator');
const { findAndUnlinkProfilePicture } = require('../utils/findAndUnlinkImage');
const { compress } = require('../utils/compress');

/*/////////////////////////////////////////////*/
/*///////////////// SIGNUP ///////////////////*/
exports.signup = catchAsync(async (req, res) => {
  const user = await User.findOne({
    $or: [{ email: req.body.email }, { username: req.body.username }],
  });
  if (user)
    return res.status(400).json({ message: 'Username or email already used' });

  if (emailAndPasswordValidator(req)) {
    const file =
      req.file && (await compress(`${req.file.filename}`, 'profilePictures'));
    const hash = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      ...req.body,
      password: hash,
      profilePictureUrl:
        req.file &&
        `${req.protocol}://${req.get('host')}/images/profilePictures/${file}`,
      role: 'user',
    });
    await user.save();
    return res.status(201).json({ message: 'User created' });
  }
});

/*////////////////////////////////////////////*/
/*///////////////// LOGIN ///////////////////*/
exports.login = catchAsync(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return res.status(401).json({ message: 'Incorrect email or password' });
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(401).json({ message: 'Incorrect email or password ' });
  else {
    res.status(200).json({
      status: 'success',
      message: 'User login',
      userId: user._id,
      token: jwt.sign({ userId: user._id }, process.env.TOKEN_KEY, {
        expiresIn: process.env.TOKEN_TTL,
      }),
      username: user.username,
      role: user.role,
    });
  }
});

/*/////////////////////////////////////////////*/
/*///////////////// UPDATE ///////////////////*/
exports.update = catchAsync(async (req, res) => {
  const userToUpdate = await User.findById(req.params.id);
  if (req.auth.role === 'admin' || req.params.id === req.auth.userId) {
    let updateUser;
    if (!req.file) updateUser = { ...req.body };
    else {
      findAndUnlinkProfilePicture(userToUpdate);
      const file =
        req.file && (await compress(`${req.file.filename}`, 'profilePictures'));
      updateUser = {
        ...req.body,
        profilePictureUrl: `${req.protocol}://${req.get(
          'host'
        )}/images/profilePictures/${file}`,
      };
    }
    await User.findByIdAndUpdate(req.params.id, {
      ...updateUser,
    });
    return res
      .status(200)
      .json({ status: 'success', message: 'User updated', updateUser });
  } else return res.status(403).json({ message: 'Forbidden' });
});

/*/////////////////////////////////////////////////////*/
/*////////////////////////////////////////////////////*/
/* THE FUNCTIONALITIES BELOW ARE NOT YET IMPLEMENTED */
////////////////////////////////////////////////////*/
/*/////////////////////////////////////////////////*/

/*/////////////////////////////////////////////*/
/*///////////////// SEARCH ///////////////////*/
exports.search = catchAsync(async (req, res) => {
  const user = await User.findOne({
    $or: [{ email: req.body.email }, { username: req.body.username }],
  });
  if (!user) return res.status(404).json({ message: 'User not found' });
  else return res.status(200).json({ message: 'User found', user });
});

/*/////////////////////////////////////////////*/
/*///////////////// GET BY ID ///////////////////*/
exports.getOne = catchAsync(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  else return res.status(200).json({ message: 'User found', user });
});

/*//////////////////////////////////////////////*/
/*///////////////// GET ALL ///////////////////*/
exports.getAll = catchAsync(async (req, res) => {
  const users = await User.find();
  if (users.length === 0)
    return res.status(404).json({ message: 'User not found' });
  else return res.status(200).json({ message: 'List of users: ', users });
});

/*/////////////////////////////////////////////*/
/*///////////////// DELETE ///////////////////*/
exports.delete = catchAsync(async (req, res) => {
  if (req.auth.role === 'admin') {
    const userToDelete = await User.findOne({
      $or: [{ email: req.body.email }, { username: req.body.username }],
    });
    if (!userToDelete)
      return res.status(404).json({ message: 'User not found' });
    if (userToDelete.profilePictureUrl)
      findAndUnlinkProfilePicture(userToDelete);
    await User.findOneAndDelete({
      $or: [{ email: req.body.email }, { username: req.body.username }],
    });
    return res.status(200).json({ message: 'User deleted' });
  } else return res.status(403).json({ message: 'Forbidden' });
});

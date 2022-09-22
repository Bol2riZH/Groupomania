'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('../models/User');

const checkAdmin = require('../utils/checkAdmin');
const catchAsync = require('../utils/catchAsync');
const emailAndPasswordValidator = require('../utils/emailAndPasswordValidator');
const { findAndUnlinkProfilePicture } = require('../utils/findAndUnlinkImage');

/*///////////////////////////////////////////////////////*/
/*///////////////// USER CONTROLLERS ///////////////////*/
/*/////////////////////////////////////////////////////*/

// signup
exports.signup = catchAsync(async (req, res) => {
  if (!emailAndPasswordValidator(req, res)) {
    const hash = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      ...req.body,
      password: hash,
      profilePictureUrl:
        req.file &&
        `${req.protocol}://${req.get('host')}/images/profilePictures/${
          req.file.filename
        }`,
      role: 'user',
    });
    await user.save();
    return res.status(201).json({ message: 'User created' });
  }
});

// login
exports.login = catchAsync(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return res.status(401).json({ message: 'Incorrect email or password ' });
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(401).json({ message: 'Incorrect email or password ' });
  else {
    res.status(200).json({
      status: 'success',
      message: 'User connected',
      userId: user._id,
      token: jwt.sign({ userId: user._id }, process.env.TOKEN_KEY, {
        expiresIn: '24h',
      }),
    });
  }
});

// update
exports.updateUser = catchAsync(async (req, res) => {
  const userToUpdate = await User.findById(req.params.id);
  if ((await checkAdmin(req)) || req.params.id === req.auth.userId) {
    let updateUser;
    if (!req.file) updateUser = { ...req.body };
    else {
      findAndUnlinkProfilePicture(userToUpdate);
      updateUser = {
        ...req.body,
        profilePictureUrl: `${req.protocol}://${req.get(
          'host'
        )}/images/profilePictures/${req.file.filename}`,
      };
    }
    await User.findByIdAndUpdate(req.params.id, {
      ...updateUser,
    });
    return res
      .status(200)
      .json({ status: 'success', message: 'User updated', updateUser });
  } else return res.status(401).json({ message: 'Unauthorized' });
});

// get all users
exports.getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find();
  if (users.length === 0)
    return res.status(404).json({ message: 'User not found' });
  else return res.status(200).json({ message: 'List of users: ', users });
});

// search one user
exports.searchUser = catchAsync(async (req, res) => {
  const user = await User.findOne({
    $or: [{ email: req.body.email }, { username: req.body.username }],
  });
  if (!user) return res.status(404).json({ message: 'User not found' });
  else return res.status(200).json({ message: 'User found', user });
});

// delete user (admin)
exports.deleteUser = catchAsync(async (req, res) => {
  if (await checkAdmin(req)) {
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
  } else return res.status(401).json({ message: 'Unauthorized' });
});

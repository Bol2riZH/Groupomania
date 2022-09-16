'use strict';

const User = require('../models/User');
const catchAsync = require('../utils/catchAsync');

exports.signup = catchAsync(async (req, res) => {
  const user = new User({
    ...req.body,
    profilPictureUrl: `${req.protocol}://${req.get(
      'host'
    )}/images/profilPictures/${req.file.filename}`,
  });
  await user.save();
  return res.status(201).json({ message: 'User created' });
});

exports.login = catchAsync(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return res.status(401).json({ message: 'Incorrect email or password ' });
  else return res.status(200).json({ message: 'User connected' });
});

exports.getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find();
  if (users.length === 0)
    return res.status(404).json({ message: 'User not found' });
  else return res.status(200).json({ message: 'List of users: ', users });
});

exports.searchUser = catchAsync(async (req, res) => {
  const user = await User.findOne({
    $or: [{ email: req.body.email }, { userName: req.body.userName }],
  });
  if (!user) return res.status(404).json({ message: 'User not found' });
  else return res.status(200).json({ message: 'User found', user });
});

exports.deleteUser = catchAsync(async (req, res) => {
  const deleteUser = await User.findOneAndRemove({
    $or: [{ email: req.body.email }, { userName: req.body.userName }],
  });
  if (!deleteUser) return res.status(404).json({ message: 'User not found' });
  else return res.status(200).json({ message: 'User deleted' });
});

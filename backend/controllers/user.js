'use strict';

const validator = require('validator');
const bcrypt = require('bcrypt');

const User = require('../models/User');
const catchAsync = require('../utils/catchAsync');

/*///////////////////////////////////////////////////////*/
/*////////////////////// FUNCTIONS /////////////////////*/
/*/////////////////////////////////////////////////////*/
const emailAndPasswordValidator = (res, email, password) => {
  if (!validator.isEmail(email)) {
    return res
      .status(400)
      .json({ status: 'fail', message: 'email format incorrect' });
  }
  if (!validator.isStrongPassword(password)) {
    return res.status(400).json({
      status: 'fail',
      message:
        'password must contain at least 8 characters, must have at least 1 capital letter, one number and one special character',
    });
  } else return false;
};

exports.signup = catchAsync(async (req, res) => {
  if (!emailAndPasswordValidator(res, req.body.email, req.body.password)) {
    const hash = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      ...req.body,
      password: hash,
      profilPictureUrl: `${req.protocol}://${req.get(
        'host'
      )}/images/profilPictures/${req.file.filename}`,
    });
    await user.save();
    return res.status(201).json({ message: 'User created' });
  }
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

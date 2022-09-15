'use strict';

const User = require('../models/User');

exports.signup = async (req, res) => {
  const user = new User({
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
  });
  try {
    await user.save();
    return res.status(201).json({ message: 'User created' });
  } catch (e) {
    return res.status(400).json({ e });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(401).json({ message: 'Incorrect email or password ' });
    else return res.status(200).json({ message: 'User connected' });
  } catch (e) {
    return res.status(500).json({ e });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (users.length === 0)
      return res.status(404).json({ message: 'No user found' });
    else return res.status(200).json({ message: 'list of users: ', users });
  } catch (e) {
    return res.status(400).json({ e });
  }
};

exports.getOneUser = async (req, res) => {
  try {
    const user = await User.findOne({
      $or: [{ email: req.body.email }, { userName: req.body.userName }],
    });
    if (!user) return res.status(404).json({ message: 'No user found' });
    else return res.status(200).json({ message: 'User found', user });
  } catch (e) {
    return res.status(500).json({ e });
  }
};

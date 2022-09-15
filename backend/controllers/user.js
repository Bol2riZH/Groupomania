'use strict';

const User = require('../models/User');

exports.signup = async (req, res) => {
  const user = new User({
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
    else return res.status(201).json({ message: 'User connected' });
  } catch (e) {
    return res.status(500).json({ e });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users) return res.status(401).json({ message: 'No user found' });
    else return res.status(201).json({ message: 'users: ', users });
  } catch (e) {
    return res.status(400).json({ e });
  }
};

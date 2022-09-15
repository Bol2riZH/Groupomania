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
  } catch (error) {
    return res.status(400).json({ error });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) return res.status(201).json({ message: 'User connected' });
    else return res.status(401).json({ message: 'Incorrect email or password ' });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

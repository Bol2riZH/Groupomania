'use strict';

const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(
  `mongodb+srv://mongoAdmin:${process.env.PASSWORD_DATABASE}/?retryWrites=true&w=majority`,
  (err) => {
    if (!err) console.log('MongoDB connected');
    else console.error('connection error: ' + err);
  }
);

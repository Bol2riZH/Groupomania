'use strict';

require('./dataBase/mongoDB');

const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const path = require('path');

app.use('/api/auth', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;

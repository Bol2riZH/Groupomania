'use strict';

require('./config/mongoDB');

const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');

app.use('/api/auth', userRoutes);
app.use('/api/posts', postRoutes);

module.exports = app;

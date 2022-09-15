'use strict';

require('./mongoDB');

const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const userRoutes = require('./routes/user')

app.use('/api/auth', userRoutes);
// app.use('/api/posts');

module.exports = app;

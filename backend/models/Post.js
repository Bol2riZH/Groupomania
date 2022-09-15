'use strict';

const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  userId: { type: String },
  userName: { type: String, required: true },
  title: { type: String, required: true },
  post: { type: String, required: true },
  imageUrl: { type: String },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  usersLiked: { type: Array, default: [] },
  usersDisliked: { type: Array, default: [] },
  date: { type: String, required: true },
});

module.exports = mongoose.model('Post', postSchema);

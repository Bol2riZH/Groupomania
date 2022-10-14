'use strict';

const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
  userId: { type: String, required: true },
  postId: { type: String, required: true },
  comment: { type: String, required: true },
  likes: { type: Number, default: 0 },
  usersLiked: { type: Array, default: [] },
  date: { type: String, required: true },
  postedTime: { type: String, required: true },
});

module.exports = mongoose.model('Comment', commentSchema);

'use strict';

const Comment = require('../models/Comment');
// const User = require('../models/User');
const Post = require('../models/Post');

const catchAsync = require('../utils/catchAsync');
const postedTime = require('../utils/postedTime');

exports.addComment = catchAsync(async (req, res) => {
  const postToComment = await Post.findById(req.params.postId);
  console.log(postToComment);

  const comment = new Comment({
    ...req.body,
    userId: req.auth.userId,
    date: Date.now(),
    postedTime: postedTime(),
  });
  await comment.save();
  console.log(comment);
  await Post.findByIdAndUpdate(req.params.postId, {
    comments: postToComment.comments.push(comment),
  });
  return res
    .status(200)
    .json({ status: 'success', message: 'post commented', postToComment });
});

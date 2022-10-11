'use strict';

const Comment = require('../models/Comment');

const catchAsync = require('../utils/catchAsync');
const postedTime = require('../utils/postedTime');

exports.addComment = catchAsync(async (req, res) => {
  const comment = new Comment({
    ...req.body,
    postId: req.params.postId,
    userId: req.auth.userId,
    date: Date.now(),
    postedTime: postedTime(),
  });
  await comment.save();
  return res
    .status(200)
    .json({ status: 'success', message: 'post commented', comment });
});

exports.getPostComments = catchAsync(async (req, res) => {
  const postComment = await Comment.find();
  if (!postComment)
    return res.status(404).json({ message: 'Comments not founded' });
  return res.status(200).json({ message: 'Comments: ', postComment });
});

'use strict';

const Comment = require('../models/Comment');

const catchAsync = require('../utils/catchAsync');
const postedTime = require('../utils/postedTime');
const { likeHandler } = require('../utils/likesHandler');

/*//////////////////////////////////////////*/
/*///////////////// ADD ///////////////////*/
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

/*//////////////////////////////////////////////////*/
/*///////////////// GET BY POST ///////////////////*/
exports.getPostComments = catchAsync(async (req, res) => {
  const postComment = await Comment.find({ postId: req.params.postId });
  if (!postComment)
    return res.status(404).json({ message: 'Comments not founded' });
  return res.status(200).json({ message: 'Comments: ', postComment });
});

/*///////////////////////////////////////////*/
/*///////////////// LIKE ///////////////////*/
exports.likeComment = catchAsync(async (req, res) => {
  await likeHandler(req, res, Comment);
});

/*/////////////////////////////////////////////*/
/*///////////////// DELETE ///////////////////*/
exports.deleteComment = catchAsync(async (req, res) => {
  const commentToDelete = await Comment.findById(req.params.id);

  if (req.auth.role === 'admin' || commentToDelete.userId === req.auth.userId) {
    await Comment.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: 'comment deleted !' });
  }
  return res.status(403).json({ message: 'Forbidden' });
});

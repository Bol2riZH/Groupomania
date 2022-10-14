'use strict';

const Comment = require('../models/Comment');

const catchAsync = require('../utils/catchAsync');
const postedTime = require('../utils/postedTime');
const {
  controlUserLiked,
  controlUserLikes,
} = require('../utils/controlUserPostNotice');
const Post = require('../models/Post');

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
  const stateLike = +req.body.like;
  const commentToLike = await Comment.findById(req.params.id);

  // Control if the user already liked the comment //
  const indexOfUserLike = controlUserLiked(commentToLike, req);
  const userLikes = controlUserLikes(commentToLike, req);

  switch (stateLike) {
    // remove like //
    case 0:
      if (indexOfUserLike !== false) {
        await Comment.findByIdAndUpdate(req.params.id, {
          ...commentToLike,
          likes: commentToLike.likes--,
          usersLiked: commentToLike.usersLiked.splice(indexOfUserLike, 1),
        });
      }
      return res
        .status(200)
        .json({ status: 'success', message: 'like removed' });

    // like //
    case 1:
      if (!userLikes) {
        await Comment.findByIdAndUpdate(req.params.id, {
          ...commentToLike,
          likes: commentToLike.likes++,
          usersLiked: commentToLike.usersLiked.push(req.auth.userId),
        });
        return res.status(200).json({
          status: 'success',
          message: 'comment liked',
        });
      }
      return res.status(400).json({
        status: 'fail',
        message: 'comment already liked',
      });
    default:
      return res.status(400).json({
        status: 'fail',
        message: 'bad request',
      });
  }
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

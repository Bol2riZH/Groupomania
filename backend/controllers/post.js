'use strict';

const Post = require('../models/Post');
const User = require('../models/User');

const catchAsync = require('../utils/catchAsync');
const postedTime = require('../utils/postedTime');
const getUserInfo = require('../utils/getUserInfo');
const { findAndUnlinkPostImage } = require('../utils/findAndUnlinkImage');
const {
  controlUserLiked,
  controlUserDisliked,
  controlUserPostLikes,
  controlUserPostDislikes,
} = require('../utils/controlUserPostNotice');

/*//////////////////////////////////////////*/
/*///////////////// ADD ///////////////////*/
exports.addPost = catchAsync(async (req, res) => {
  const user = await User.findById(req.auth.userId);
  const userInfo = getUserInfo(user);

  const postContent = { ...req.body };
  const post = new Post({
    ...postContent,
    userId: req.auth.userId,
    userInfo: userInfo,
    imageUrl:
      req.file &&
      `${req.protocol}://${req.get('host')}/images/posts/${req.file.filename}`,
    date: Date.now(),
    postedTime: postedTime(),
  });
  await post.save();
  return res
    .status(201)
    .json({ status: 'success', message: 'Posts added: ', post });
});

/*/////////////////////////////////////////////*/
/*///////////////// UPDATE ///////////////////*/
exports.updatePost = catchAsync(async (req, res) => {
  const postToUpdate = await Post.findById(req.params.id);

  //  check admin right or userID
  if (req.auth.role === 'admin' || postToUpdate.userId === req.auth.userId) {
    const user = await User.findById(req.auth.userId);
    const userInfo = getUserInfo(user);

    let updatePost;
    if (!req.file) updatePost = { ...req.body };
    else {
      findAndUnlinkPostImage(postToUpdate);
      updatePost = {
        ...req.body,
        userInfo: userInfo,
        imageUrl: `${req.protocol}://${req.get('host')}/images/posts/${
          req.file.filename
        }`,
      };
    }
    await Post.findByIdAndUpdate(req.params.id, {
      ...updatePost,
    });
    return res
      .status(200)
      .json({ status: 'success', message: 'Posts updated', updatePost });
  }
  return res.status(403).json({ message: 'Forbidden' });
});

/*//////////////////////////////////////////////*/
/*///////////////// COMMENT ///////////////////*/
exports.commentPost = catchAsync(async (req, res) => {
  const postToComment = await Post.findById(req.params.id);

  const user = await User.findById(req.auth.userId);
  const userInfo = getUserInfo(user);

  await Post.findByIdAndUpdate(req.params.id, {
    ...postToComment,
    comments: postToComment.comments.push({
      ...userInfo,
      comment: req.body.comments,
      date: postedTime(),
    }),
  });
  return res
    .status(200)
    .json({ status: 'success', message: 'post commented', postToComment });
});

/*/////////////////////////////////////////////*/
/*///////////////// NOTICE ///////////////////*/
exports.NoticePost = catchAsync(async (req, res) => {
  const stateLike = +req.body.like;
  const postToNoticed = await Post.findById(req.params.id);

  // Control if the user already noticed the post //
  const indexOfUserLike = controlUserLiked(postToNoticed, req);
  const indexOfUserDislike = controlUserDisliked(postToNoticed, req);
  const userLikes = controlUserPostLikes(postToNoticed, req);
  const userDislikes = controlUserPostDislikes(postToNoticed, req);

  switch (stateLike) {
    // remove notice //
    case 0:
      if (indexOfUserLike !== false) {
        await Post.findByIdAndUpdate(req.params.id, {
          ...postToNoticed,
          likes: postToNoticed.likes--,
          usersLiked: postToNoticed.usersLiked.splice(indexOfUserLike, 1),
        });
      }
      if (indexOfUserDislike !== false) {
        await Post.findByIdAndUpdate(req.params.id, {
          ...postToNoticed,
          dislikes: postToNoticed.dislikes--,
          usersDisliked: postToNoticed.usersDisliked.splice(
            indexOfUserDislike,
            1
          ),
        });
      }
      return res
        .status(200)
        .json({ status: 'success', message: 'notice removed' });

    // like //
    case 1:
      if (!userLikes && !userDislikes) {
        await Post.findByIdAndUpdate(req.params.id, {
          ...postToNoticed,
          likes: postToNoticed.likes++,
          usersLiked: postToNoticed.usersLiked.push(req.auth.userId),
        });
        return res.status(400).json({
          status: 'success',
          message: 'post liked',
        });
      }
      return res.status(400).json({
        status: 'fail',
        message: 'post already liked',
      });

    // dislike //
    case -1:
      if (!userDislikes && !userLikes) {
        await Post.findByIdAndUpdate(req.params.id, {
          ...postToNoticed,
          dislikes: postToNoticed.dislikes++,
          usersDisliked: postToNoticed.usersDisliked.push(req.auth.userId),
        });
        return res.status(400).json({
          status: 'success',
          message: 'post disliked',
        });
      }
      return res.status(400).json({
        status: 'fail',
        message: 'post already disliked',
      });
    default:
      return res.status(400).json({
        status: 'fail',
        message: 'bad request',
      });
  }
});

/*//////////////////////////////////////////////////////////////////*/
/*///////////////// SEARCH BY USERNAME OR TITLE ///////////////////*/
exports.searchPost = catchAsync(async (req, res) => {
  const post = await Post.find({
    $or: [{ username: req.body.username }, { title: req.body.title }],
  });
  if (post.length === 0)
    return res.status(404).json({ message: 'Posts not founded' });
  return res.status(200).json({ message: 'Posts: ', post });
});

/*//////////////////////////////////////////////*/
/*///////////////// GET ALL ///////////////////*/
exports.getAllPosts = catchAsync(async (req, res) => {
  const posts = await Post.find();
  if (!posts) return res.status(404).json({ message: 'Posts not founded' });
  return res.status(200).json({ message: 'Posts: ', posts });
});

/*//////////////////////////////////////////////*/
/*///////////////// GET ONE ///////////////////*/
exports.getOnePost = catchAsync(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: 'Posts not founded' });
  return res.status(200).json({ message: 'Posts: ', post });
});

/*/////////////////////////////////////////////*/
/*///////////////// DELETE ///////////////////*/
exports.deletePost = catchAsync(async (req, res) => {
  const postToDelete = await Post.findById(req.params.id);

  if (req.auth.role === 'admin' || postToDelete.userId === req.auth.userId) {
    postToDelete.imageUrl && findAndUnlinkPostImage(postToDelete);
    await Post.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: 'post deleted !' });
  }
  return res.status(403).json({ message: 'Forbidden' });
});

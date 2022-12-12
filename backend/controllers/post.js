'use strict';

const Post = require('../models/Post');
const Comment = require('../models/Comment');

const catchAsync = require('../utils/catchAsync');
const postedTime = require('../utils/postedTime');
const { likeHandler } = require('../utils/likesHandler');

const { findAndUnlinkPostImage } = require('../utils/findAndUnlinkImage');
const { compress } = require('../utils/compress');

/*//////////////////////////////////////////*/
/*///////////////// ADD ///////////////////*/
exports.addPost = catchAsync(async (req, res) => {
  const file = req.file && (await compress(`${req.file.filename}`, 'posts'));
  const post = new Post({
    ...req.body,
    userId: req.auth.userId,
    imageUrl: req.file
      ? `${req.protocol}://${req.get('host')}/images/posts/${file}`
      : '',
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
    let updatePost;
    if (!req.file)
      updatePost = {
        ...req.body,
        postedTime: `Édité le : ${postedTime()}`,
      };
    else {
      findAndUnlinkPostImage(postToUpdate);
      const file =
        req.file && (await compress(`${req.file.filename}`, 'posts'));
      updatePost = {
        ...req.body,
        imageUrl: `${req.protocol}://${req.get('host')}/images/posts/${file}`,
        postedTime: `Édité le : ${postedTime()}`,
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

/*///////////////////////////////////////////////////*/
/*///////////////// REMOVE IMAGE ///////////////////*/
exports.removePostImage = catchAsync(async (req, res) => {
  const imageToRemove = await Post.findById(req.params.id);
  if (req.auth.role === 'admin' || imageToRemove.userId === req.auth.userId) {
    const updatePost = {
      ...req.body,
      imageUrl: '',
      date: Date.now(),
      postedTime: `Édité le : ${postedTime()}`,
    };
    findAndUnlinkPostImage(imageToRemove);
    await Post.findByIdAndUpdate(req.params.id, { ...updatePost });
    return res
      .status(200)
      .json({ status: 'success', message: 'Image removed' });
  }
  return res.status(403).json({ message: 'Forbidden' });
});

/*//////////////////////////////////////////////*/
/*///////////////// GET ALL ///////////////////*/
exports.getAllPosts = catchAsync(async (req, res) => {
  const posts = await Post.find();
  if (!posts) return res.status(404).json({ message: 'Posts not founded' });
  return res.status(200).json({ message: 'Posts: ', posts });
});

/*/////////////////////////////////////////////*/
/*///////////////// LIKE ///////////////////*/
exports.likePost = catchAsync(async (req, res) => {
  await likeHandler(req, res, Post);
});

/*/////////////////////////////////////////////*/
/*///////////////// DELETE ///////////////////*/
exports.deletePost = catchAsync(async (req, res) => {
  const postToDelete = await Post.findById(req.params.id);

  if (req.auth.role === 'admin' || postToDelete.userId === req.auth.userId) {
    postToDelete.imageUrl && findAndUnlinkPostImage(postToDelete);
    await Post.findByIdAndDelete(req.params.id);
    await Comment.deleteMany({ postId: req.params.id });

    return res.status(200).json({ message: 'post deleted !' });
  }
  return res.status(403).json({ message: 'Forbidden' });
});

/*////////////////////////////////////////////////////*/
/* THE FUNCTIONALITIES BELOW ARE NOT YET IMPLEMENTED */
////////////////////////////////////////////////////*/

/*/ /////////////////////////////////////////////////////////////////*/
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
/*///////////////// GET ONE ///////////////////*/
exports.getOnePost = catchAsync(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: 'Posts not founded' });
  return res.status(200).json({ message: 'Posts: ', post });
});

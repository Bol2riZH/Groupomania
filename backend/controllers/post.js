'use strict';

const Post = require('../models/Post');
const catchAsync = require('../utils/catchAsync');

const fs = require('fs');

const moment = require('moment');
moment.locale('fr');

/* GET TIME IN FR FORMAT */
const postedTime = () => {
  const time = moment.now();
  return moment(time).format('LLLL');
};

// add post
exports.addPost = catchAsync(async (req, res) => {
  const postContent = await { ...req.body };
  const post = new Post({
    ...postContent,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get('host')}/images/posts/${
      req.file.filename
    }`,
    date: postedTime(),
  });
  await post.save();
  return res
    .status(201)
    .json({ status: 'success', message: 'Post added: ', post });
});

// get all posts
exports.getAllPosts = catchAsync(async (req, res) => {
  const posts = await Post.find();
  if (!posts) return res.status(404).json({ message: 'Post not founded' });
  else return res.status(200).json({ message: 'List of post: ', posts });
});

// get one post
exports.getOnePost = catchAsync(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: 'Post not founded' });
  else return res.status(200).json({ message: 'Post: ', post });
});

// search post by userName or title
exports.searchPost = catchAsync(async (req, res) => {
  const post = await Post.find({
    $or: [{ userName: req.body.userName }, { title: req.body.title }],
  });
  if (post.length === 0)
    return res.status(404).json({ message: 'Post not founded' });
  else return res.status(200).json({ message: 'Post: ', post });
});

// update post
// exports.updatePost = catchAsync(async (req, res) => {
//   const updatePost = req.file
//     ? {
//         ...req.body,
//         imageUrl: `${req.protocol}://${req.get('host')}/images/posts/${
//           req.file.filename
//         }`,
//       }
//     : { ...req.body };
//   await Post.findByIdAndUpdate(req.params.id, {
//     ...updatePost,
//   });
//   return res
//     .status(200)
//     .json({ status: 'success', message: 'Post updated', updatePost });
// });

///////////////////////////////////////////////////
exports.updatePost = catchAsync(async (req, res) => {
  if (req.file) {
    const getFilename = await Post.findById(req.params.id);
    const filename = getFilename.imageUrl.split('images/posts/')[1];
    fs.unlink(`images/posts/${filename}`, () => {});
    const updatePost = {
      ...req.body,
      imageUrl: `${req.protocol}://${req.get('host')}/images/posts/${
        req.file.filename
      }`,
    };
    await Post.findByIdAndUpdate(req.params.id, {
      ...updatePost,
    });
    return res
      .status(200)
      .json({ status: 'success', message: 'Post updated', updatePost });
  } else {
    const updatePost = { ...req.body };
    await Post.findByIdAndUpdate(req.params.id, {
      ...updatePost,
    });
    return res
      .status(200)
      .json({ status: 'success', message: 'Post updated', updatePost });
  }
});
// });
// const updatePost = req.file
//   ? {
//       ...req.body,
//       imageUrl: `${req.protocol}://${req.get('host')}/images/posts/${
//         req.file.filename
//       }`,
//     }
//   : { ...req.body };
// delete updatePost._userId;
// const filename = updatePost.imageUrl.split('images/posts/')[1];
// fs.unlink(`images/posts/${filename}`, async () => {
//   await Post.findByIdAndUpdate(req.params.id, {
//     ...updatePost,
//   });
//   return res
//     .status(200)
//     .json({ status: 'success', message: 'Post updated', updatePost });
// }});
// });

// delete post
exports.deletePost = catchAsync(async (req, res) => {
  const deletePost = await Post.findById(req.params.id);
  if (deletePost.userId !== req.auth.userId)
    res.status(401).json({ message: 'Unauthorized' });
  else {
    const filename = deletePost.imageUrl.split('images/posts/')[1];
    fs.unlink(`images/posts/${filename}`, async () => {
      await Post.findByIdAndDelete(req.params.id);
      return res.status(200).json({ message: 'post deleted !' });
    });
  }
});

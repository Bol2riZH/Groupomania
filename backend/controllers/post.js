'use strict';

const Post = require('../models/Post');
const catchAsync = require('../utils/catchAsync');

const moment = require('moment');
moment.locale('fr');

/* GET TIME IN FR FORMAT */
const postedTime = () => {
  const time = moment.now();
  return moment(time).format('LLLL');
};

exports.addPost = catchAsync(async (req, res) => {
  const post = new Post({
    userName: req.body.userName,
    title: req.body.title,
    post: req.body.post,
    date: postedTime(),
  });
  await post.save();
  return res.status(201).json({ message: 'Post added: ', post });
});

exports.getAllPosts = catchAsync(async (req, res) => {
  const posts = await Post.find();
  if (!posts) return res.status(404).json({ message: 'Post not found' });
  else return res.status(200).json({ message: 'List of post: ', posts });
});

exports.getOnePost = catchAsync(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: 'Post not found' });
  else return res.status(200).json({ message: 'Post: ', post });
});

exports.searchPost = catchAsync(async (req, res) => {
  const post = await Post.find({
    $or: [{ userName: req.body.userName }, { title: req.body.title }],
  });
  if (post.length === 0)
    return res.status(404).json({ message: 'No post found' });
  else return res.status(200).json({ message: 'Post: ', post });
});

exports.updatePost = catchAsync(async (req, res) => {
  const updatePost = { ...req.body };
  await Post.findByIdAndUpdate(req.params.id, {
    ...updatePost,
  });
  return res.status(200).json({ message: 'Post updated', updatePost });
});

exports.deletePost = catchAsync(async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  return res.status(200).json({ message: 'Post deleted' });
});

'use strict';

const Post = require('../models/Post');
const catchAsync = require('../utils/catchAsync');
const postedTime = require('../utils/postedTime');
const { findAndUnlinkPostImage } = require('../utils/findAndUnlinkImage');

// add post
exports.addPost = catchAsync(async (req, res) => {
  const postContent = { ...req.body };
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
exports.updatePost = catchAsync(async (req, res) => {
  const postToUpdate = await Post.findById(req.params.id);

  if (postToUpdate.userId !== req.auth.userId)
    return res.status(401).json({ message: 'Unauthorized' });

  let updatePost;
  if (!req.file) updatePost = { ...req.body };
  else {
    await findAndUnlinkPostImage(postToUpdate, 'posts');
    updatePost = {
      ...req.body,
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
    .json({ status: 'success', message: 'Post updated', updatePost });
});

// delete post
exports.deletePost = catchAsync(async (req, res) => {
  const postToDelete = await Post.findById(req.params.id);

  if (postToDelete.userId !== req.auth.userId)
    return res.status(401).json({ message: 'Unauthorized' });

  await findAndUnlinkPostImage(postToDelete, 'posts');
  await Post.findByIdAndDelete(req.params.id);
  return res.status(200).json({ message: 'post deleted !' });
});

//like / dislike a post
exports.NoticedPost = catchAsync(async (req, res) => {
  const stateLike = +req.body.like;
  const postToNoticed = await Post.findById(req.params.id);
  switch (stateLike) {
    case 0:
      if (postToNoticed.usersLiked.includes(postToNoticed.userId)) {
        const indexOfUser = postToNoticed.usersLiked.indexOf(
          postToNoticed.userId
        ); //TODO : postToNoticed.userId -> req.auth.id
        await Post.findByIdAndUpdate(req.params.id, {
          ...postToNoticed,
          likes: postToNoticed.likes--,
          usersLiked: postToNoticed.usersLiked.splice(indexOfUser, 1),
        });
      }
      if (postToNoticed.usersDisliked.includes(postToNoticed.userId)) {
        const indexOfUser = postToNoticed.usersDisliked.indexOf(
          postToNoticed.userId
        ); //TODO : postToNoticed.userId -> req.auth.id
        await Post.findByIdAndUpdate(req.params.id, {
          ...postToNoticed,
          dislikes: postToNoticed.dislikes--,
          usersDisliked: postToNoticed.usersDisliked.splice(indexOfUser, 1),
        });
      }
      break;
    case 1:
      await Post.findByIdAndUpdate(req.params.id, {
        ...postToNoticed,
        likes: postToNoticed.likes++,
        usersLiked: postToNoticed.usersLiked.push(postToNoticed.userId), //TODO : postToNoticed.userId -> req.auth.id
      });
      break;
    case -1:
      await Post.findByIdAndUpdate(req.params.id, {
        ...postToNoticed,
        dislikes: postToNoticed.dislikes++,
        usersDisliked: postToNoticed.usersDisliked.push(postToNoticed.userId), //TODO : postToNoticed.userId -> req.auth.id
      });
      break;
  }
  return res
    .status(200)
    .json({ status: 'success', message: 'post noticed', postToNoticed });
});

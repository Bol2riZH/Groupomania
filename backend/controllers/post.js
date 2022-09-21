'use strict';

const Post = require('../models/Post');
const User = require('../models/User');
const catchAsync = require('../utils/catchAsync');
const postedTime = require('../utils/postedTime');
const { findAndUnlinkPostImage } = require('../utils/findAndUnlinkImage');
const {
  controlUserLiked,
  controlUserDisliked,
  controlUserPostLikes,
  controlUserPostDislikes,
} = require('../utils/controlUserPostNotice');

/*///////////////////////////////////////////////////////*/
/*///////////////// POST CONTROLLERS ///////////////////*/
/*/////////////////////////////////////////////////////*/

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

// search post by username or title
exports.searchPost = catchAsync(async (req, res) => {
  const post = await Post.find({
    $or: [{ username: req.body.username }, { title: req.body.title }],
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
exports.NoticePost = catchAsync(async (req, res) => {
  const stateLike = +req.body.like;
  const postToNoticed = await Post.findById(req.params.id);

  const authId = req.auth.userId;
  const indexOfUserLike = controlUserLiked(postToNoticed, authId);
  const indexOfUserDislike = controlUserDisliked(postToNoticed, authId);
  const userLikes = controlUserPostLikes(postToNoticed, authId);
  const userDislikes = controlUserPostDislikes(postToNoticed, authId);

  switch (stateLike) {
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
      break;
    case 1:
      if (!userLikes && !userDislikes) {
        await Post.findByIdAndUpdate(req.params.id, {
          ...postToNoticed,
          likes: postToNoticed.likes++,
          usersLiked: postToNoticed.usersLiked.push(authId),
        });
      }
      break;
    case -1:
      if (!userDislikes && !userLikes) {
        await Post.findByIdAndUpdate(req.params.id, {
          ...postToNoticed,
          dislikes: postToNoticed.dislikes++,
          usersDisliked: postToNoticed.usersDisliked.push(authId),
        });
      }
      break;
  }
  return res
    .status(200)
    .json({ status: 'success', message: 'post noticed', postToNoticed });
});

exports.commentPost = catchAsync(async (req, res) => {
  const postToComment = await Post.findById(req.params.id);

  const user = await User.findById(req.auth.userId);
  const userInfo = {
    userId: req.auth.userId,
    username: user.username,
    profilPictureUrl: user.profilPictureUrl,
  };

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

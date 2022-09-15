'use strict';

const Post = require('../models/Post');

exports.addPost = async (req, res) => {
  try {
    const post = new Post({
      title: req.body.title,
      post: req.body.post,
    });
    await post.save();
    return res.status(201).json({ message: 'Post added' });
  } catch (e) {
    return res.status(400).json({ e });
  }
};

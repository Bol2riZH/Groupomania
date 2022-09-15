'use strict';

const Post = require('../models/Post');

const moment = require('moment');
moment.locale('fr');

exports.addPost = async (req, res) => {
  try {
    const post = new Post({
      title: req.body.title,
      post: req.body.post,
      date: postedTime(),
    });
    console.log(post);
    await post.save();
    return res.status(201).json({ message: 'Post added' });
  } catch (e) {
    return res.status(400).json({ e });
  }
};

/* GET TIME IN FR FORMAT */
const postedTime = () => {
  const time = moment.now();
  return moment(time).format('LLLL');
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    if (!posts) return res.status(404).json({ message: 'No post found' });
    else return res.status(200).json({ message: 'list of post: ', posts });
  } catch (e) {
    return res.status(400).json({ e });
  }
};

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

exports.getAllPosts = async (req, res) => {
  try {
  } catch (e) {}
};

/* GET TIME IN FR FORMAT */
const postedTime = () => {
  const time = moment.now();
  return moment(time).format('LLLL');
};

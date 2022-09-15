'use strict';

const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post');

router.post('/', postCtrl.addPost);
// router.put('/:id', postCtrl.updatePost);
// router.delete('/:id', postCtrl.deletePost);
router.get('/:id', postCtrl.getOnePost);
router.post('/search-post', postCtrl.searchPost);
router.get('/', postCtrl.getAllPosts);
// router.post('/:id/like', postCtrl.likedPost);

module.exports = router;

'use strict';

const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post');
const auth = require('../middlewares/auth');
const { postMulter } = require('../middlewares/multer');

router.post('/', auth, postMulter, postCtrl.addPost);
router.get('/', postCtrl.getAllPosts);
router.get('/:id', postCtrl.getOnePost);
router.post('/search-post', postCtrl.searchPost);
router.put('/:id', auth, postMulter, postCtrl.updatePost);
router.delete('/:id', auth, postCtrl.deletePost);
// router.post('/:id/like', postCtrl.likedPost);
// router.post('/:id/comment', postCtrl.commentPost)

module.exports = router;

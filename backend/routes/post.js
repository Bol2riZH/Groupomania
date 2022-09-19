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
router.put('/:id', postCtrl.updatePost);
router.delete('/:id', postCtrl.deletePost);
// router.post('/:id/like', postCtrl.likedPost);

module.exports = router;

'use strict';

const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post');

const auth = require('../middlewares/auth');
const { postMulter } = require('../middlewares/multer');

router.post('/', auth, postMulter, postCtrl.addPost);
router.put('/:id', auth, postMulter, postCtrl.updatePost);
router.post('/:id/comment', auth, postCtrl.commentPost);
router.post('/:id/notice', auth, postCtrl.NoticePost);

router.post('/search-post', postCtrl.searchPost);

router.get('/', postCtrl.getAllPosts);
router.get('/:id', postCtrl.getOnePost);

router.delete('/:id', auth, postCtrl.deletePost);

module.exports = router;

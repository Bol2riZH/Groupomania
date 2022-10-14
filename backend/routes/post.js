'use strict';

const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post');

const auth = require('../middlewares/auth');
const { postMulter } = require('../middlewares/multer');

router.post('/', auth, postMulter, postCtrl.addPost);
router.put('/:id', auth, postMulter, postCtrl.updatePost);
router.put('/remove-image/:id', auth, postMulter, postCtrl.removePostImage);

router.post('/notice/:id', auth, postCtrl.noticePost);

router.post('/search-post', postCtrl.searchPost);

router.get('/', postCtrl.getAllPosts);
router.get('/:id', postCtrl.getOnePost);

router.delete('/:id', auth, postCtrl.deletePost);

module.exports = router;

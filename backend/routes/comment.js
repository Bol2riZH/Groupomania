'use strict';

const express = require('express');
const router = express.Router();

const commentCtrl = require('../controllers/comment');

const auth = require('../middlewares/auth');

router.post('/:postId', auth, commentCtrl.addComment);
router.get('/:postId', commentCtrl.getPostComments);

router.post('/like/:id', auth, commentCtrl.likeComment);

router.delete('/:id', auth, commentCtrl.deleteComment);

module.exports = router;

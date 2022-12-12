'use strict';

const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post');

const auth = require('../middlewares/auth');
const { postMulter } = require('../middlewares/multer');

router.post('/', auth, postMulter, postCtrl.addPost);
router.put('/:id', auth, postMulter, postCtrl.updatePost);
router.put('/remove-image/:id', auth, postMulter, postCtrl.removePostImage);
router.get('/', postCtrl.getAllPosts);
router.post('/like/:id', auth, postCtrl.likePost);
router.delete('/:id', auth, postCtrl.deletePost);

/*////////////////////////////////////////////////////*/
/* THE FUNCTIONALITIES BELOW ARE NOT YET IMPLEMENTED */
////////////////////////////////////////////////////*/
router.post('/search-post', postCtrl.searchPost);
router.get('/:id', postCtrl.getOnePost);

module.exports = router;

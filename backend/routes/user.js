'use strict';

const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const auth = require('../middlewares/auth');
const { profilePictureMulter } = require('../middlewares/multer');

router.post('/signup', profilePictureMulter, userCtrl.signup);
router.post('/login', userCtrl.login);
router.put('/:id', auth, profilePictureMulter, userCtrl.updateUser);
router.get('/', userCtrl.getAllUsers);
router.post('/search-user', userCtrl.searchUser);
router.delete('/', auth, userCtrl.deleteUser);
// router.post('/', userCtrl.logout);

module.exports = router;

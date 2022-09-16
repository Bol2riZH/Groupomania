'use strict';

const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const multer = require('../middlewares/multer');

router.post('/signup', multer.profilePictureMulter, userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/', userCtrl.getAllUsers);
router.post('/search-user', userCtrl.searchUser);
router.delete('/', userCtrl.deleteUser);

module.exports = router;

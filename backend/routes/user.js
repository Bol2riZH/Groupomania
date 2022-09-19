'use strict';

const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const { profilePictureMulter } = require('../middlewares/multer');

router.post('/signup', profilePictureMulter, userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/', userCtrl.getAllUsers);
router.post('/search-user', userCtrl.searchUser);
router.delete('/', userCtrl.deleteUser);
// router.post('/',userCtrl.logout);

module.exports = router;

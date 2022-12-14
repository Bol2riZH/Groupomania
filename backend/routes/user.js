'use strict';

const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

const auth = require('../middlewares/auth');
const { profilePictureMulter } = require('../middlewares/multer');

router.post('/signup', profilePictureMulter, userCtrl.signup);
router.post('/login', userCtrl.login);
router.put('/update/:id', auth, profilePictureMulter, userCtrl.update);

/*////////////////////////////////////////////////////*/
/* THE FUNCTIONALITIES BELOW ARE NOT YET IMPLEMENTED */
////////////////////////////////////////////////////*/
router.post('/search', userCtrl.search);
router.get('/:id', userCtrl.getOne);
router.get('/', userCtrl.getAll);
router.delete('/delete', auth, userCtrl.delete);

module.exports = router;

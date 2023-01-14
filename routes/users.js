var express = require('express');
var router = express.Router();

const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const { upload } = require('../utils/upload')
const { uploadImage } = require('../utils/upload')
const verifyToken = authController.verifyToken;

router.get('/:handle', userController.userDetail);
router.post('/:handle/profile', verifyToken, upload.single('image'), uploadImage, userController.editUserProfile);

router.get('/:handle/posts', userController.getPosts);
router.post('/:handle/posts', verifyToken, upload.single('image'), uploadImage, userController.createPost);

router.post('/:handle/followers', verifyToken, userController.addFollower);

router.get('/:handle/suggested', userController.getSuggested);

router.get('/:handle/feed', verifyToken, userController.getFeed);

module.exports = router;

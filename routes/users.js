var express = require('express');
var router = express.Router();

const userController = require('../controllers/userController');
const editUserProfile = userController.editUserProfile
const userDetail = userController.userDetail
const getPosts = userController.getPosts
const createPost = userController.createPost
const addFollower = userController.addFollower
const getSuggested = userController.getSuggested
const getFeed = userController.getFeed

const authController = require('../controllers/authController');
const { upload } = require('../utils/upload')
const { uploadImage } = require('../utils/upload')
const verifyToken = authController.verifyToken;

router.get('/:handle', userDetail);
router.post('/:handle/profile', verifyToken, upload.single('image'), uploadImage, editUserProfile);

router.get('/:handle/posts', getPosts);
router.post('/:handle/posts', verifyToken, upload.single('image'), uploadImage, createPost);

router.post('/:handle/followers', verifyToken, addFollower);

router.get('/:handle/suggested', getSuggested);

router.get('/:handle/feed', verifyToken, getFeed);

module.exports = router;

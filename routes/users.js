var express = require('express');
var router = express.Router();

const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const verifyToken = authController.verifyToken;

router.get('/:handle', userController.userDetail);
router.post('/:handle/profile', verifyToken, userController.uploadMiddleware, userController.editUserProfile);

router.get('/:handle/posts', userController.getPosts);
router.post('/:handle/posts', verifyToken, userController.uploadMiddleware, userController.createPost);

router.post('/:handle/followers', verifyToken, userController.addFollower);

router.get('/:handle/suggested', userController.getSuggested);

router.get('/images/:id', userController.getImage);

module.exports = router;

var express = require('express');
var router = express.Router();

const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

router.get('/:handle', userController.userDetail);
router.post('/:handle/profile', authController.verifyToken, userController.uploadMiddleware, userController.editUserProfile);
router.get('/:handle/posts', userController.getPosts);
router.post('/:handle/posts', authController.verifyToken, userController.uploadMiddleware, userController.createPost);
router.get('/images/:id', userController.getImage);

module.exports = router;

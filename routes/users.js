var express = require('express');
var router = express.Router();

const userController = require('../controllers/userController');

router.get('/:handle', userController.userDetail);
router.post('/:handle/profile', userController.editUserProfile);

module.exports = router;

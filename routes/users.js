var express = require('express');
var router = express.Router();

const userController = require('../controllers/userController');

router.get('/:handle', userController.userDetail);

module.exports = router;

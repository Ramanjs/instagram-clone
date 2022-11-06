var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');

/* GET home page. */
router.get('/', (req, res, next) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.status(403).json({
        success: false,
        message: 'Forbidden'
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'Welcome to instagram!'
      });
    }
  })
});

module.exports = router;

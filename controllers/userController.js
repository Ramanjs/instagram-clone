const User = require('../models/user');
const jwt = require('jsonwebtoken');
const async = require('async');

exports.userDetail = (req, res, next) => {
  async.parallel({
    user(callback) {
      User.findOne({handle: req.params.handle}).exec(callback);
    }
  },
    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.user == null) {
        res.status(404).json({
          success: false,
          message: 'User not found'
        })
      }

      res.status(200).json({
        success: true,
        message: 'Query successfull',
        data: results.user
      })
    }
  );
};

exports.editUserProfile = (req, res) => {
  jwt.verify(req.token, 'secretkey', (err, payload) => {
    if (err) {
      console.log(err)
      res.status(500).json({
        success: false,
        message: 'Internal server error occured'
      })
    }

    if (payload.handle !== req.params.handle) {
      res.status(403).json({
        success: false,
        message: 'Forbidden'
      })
    }

    res.status(200).json({
      success: true,
      message: 'This works!'
    })
  })
}

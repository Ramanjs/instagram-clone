const User = require('../models/user');
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

}

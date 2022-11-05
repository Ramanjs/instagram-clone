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
        res.json({
          data: 'user not found'
        })
      }

      res.json({
        data: results.user
      })
    }
  );
};

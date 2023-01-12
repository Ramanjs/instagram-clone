const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.signup = (req, res, next) => {
  User.findOne({ handle: req.body.handle }, (err, user) => {
    if (err) {
      return next(err);
    }

    if (user) {
      res.status(400).json({
        success: false,
        message: 'Handle already exists'
      })
    }

    const userDetails = {
      name: req.body.name,
      handle: req.body.handle,
      password: req.body.password
    }

    const newUser = new User(userDetails);
    newUser.save((err) => {
      if (err) {
        next(err);
      }

      res.status(200).json({
        success: true,
        message: 'Account created successfully'
      })
    })
  })
}

exports.login = async (req, res) => {
  User.findOne({ handle: req.body.handle }, async (err, user) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: 'Some error occured, please try again later'
      })
    }

    if (!user) {
      res.status(404).json({
        success: false,
        message: 'Invalid username or password',
      })
    } else if (!(await user.isValidPassword(req.body.password))) {
      res.status(404).json({
        success: false,
        message: 'Invalid username or password',
      })
    } else {
      const payload = {
        handle: req.body.handle
      }

      jwt.sign(payload, 'secretkey', {expiresIn: '1m'}, (err, token) => {
        if (err) {
          res.sendStatus(500);
        }
        res.status(200).json({
          success: true,
          message: 'Logged in successfully',
          token,
          handle: req.body.handle
        })
      })
    }
  })
}

exports.verifyToken = (req, res, next) => {
  const bearerHeader = req.headers['authorization'];

  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.status(403).json({
      success: false,
      message: 'Bearer undefined'
    })
  }
}

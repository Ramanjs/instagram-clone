const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res, next) => {
  User.findOne({ handle: req.body.handle }, async (err, user) => {
    if (err) {
      return next(err);
    }

    if (user) {
      res.status(400).json({
        success: false,
        message: 'Handle already exists'
      })
    }

    const hash = await bcrypt.hash(req.body.password, 10);
    const userDetails = {
      name: req.body.name,
      handle: req.body.handle,
      password: hash 
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
        message: 'Invalid username',
      })
    } else if (!(await user.isValidPassword(req.body.password))) {
      console.log(req.body.password)
      res.status(404).json({
        success: false,
        message: 'Invalid password',
      })
    } else {
      const payload = {
        handle: req.body.handle
      }

      jwt.sign(payload, 'secretkey', {expiresIn: '1d'}, (err, token) => {
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

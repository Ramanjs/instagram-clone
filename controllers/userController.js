const User = require('../models/user');
const Post = require('../models/post');
const jwt = require('jsonwebtoken');
const async = require('async');

exports.userDetail = (req, res, next) => {
  async.parallel({
    user(callback) {
      User.findOne({handle: req.params.handle}).populate('followers').exec(callback);
    }
  },
    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.user == null) {
        return res.status(404).json({
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

exports.editUserProfile = async (req, res) => {
  let decoded;
  try {
    decoded = jwt.verify(req.token, 'secretkey');
  } catch(err) {
      return res.status(500).json({
        success: false,
        message: 'Internal server error occured'
      })
  }
  if (decoded.handle !== req.params.handle) {
    return res.status(403).json({
      success: false,
      message: 'Forbidden'
    })
  }

  const { imageUrl } = req;

  const user = await User.findOne({ handle: req.params.handle }).exec();
  let pfp, bio;
  pfp = user.pfp;
  bio = user.bio;

  if (imageUrl) {
    try {
      user.pfp = imageUrl;
      pfp = user.pfp;
      await user.save();
    } catch(err) {
      return res.status(500).json({
        success: false,
        message: err
      })
    }
  }

  if (req.body.bio) {
    try {
      user.bio = req.body.bio;
      bio = user.bio;
      await user.save();
    } catch(err) {
      return res.status(500).json({
        success: false,
        message: err
      })
    }
  }
  res.status(200).json({
    success: true,
    data: { pfp, bio }
  })
}

exports.createPost = async (req, res) => {
  let decoded;
  try {
    decoded = jwt.verify(req.token, 'secretkey');
  } catch(err) {
      return res.status(500).json({
        success: false,
        message: 'Internal server error occured'
      })
  }
  if (decoded.handle !== req.params.handle) {
    return res.status(403).json({
      success: false,
      message: 'Forbidden'
    })
  }

  const { imageUrl } = req;
  const caption = req.body.caption;

  const post = {
    image: imageUrl,
    caption
  }

  try {
    const newPost = await Post.create(post);
    User.findOneAndUpdate(
      { handle: req.params.handle },
      {"$push": {posts: newPost}}
    )
      .then(() => {
        res.status(200).json({
          success: true,
          message: id,
        })
      })
      .catch(() => {
        res.status(500).json({
          success: false,
          message: 'Internal server error'
        })
    })
  } catch(err) {
    res.status(500).json({
      success: false,
      message: err
    })
  }
}

exports.getPosts = (req, res, next) => {
  const handle = req.params.handle;

  if (!handle || handle === undefined) {
    return res.status(400).send({
      success: false,
      message: 'No handle specified'
    })
  }

  User.findOne({ handle })
    .populate('posts')
    .exec((err, user) => {
      if (err) {
        return next(err)
      }

      const posts = user.posts.map(post => ({
        image: post.image,
        caption: post.caption
      }))

      res.status(200).json({
        success: true,
        message: posts
      })
    });
}

exports.getSuggested = (req, res, next) => {
  const handle = req.params.handle

  User.find({}, (err, users) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: err
      })
    }

    User.findOne({ handle })
      .populate('following')
      .exec((err, user) => {
        const suggested = [];

        users.forEach(suggestion => {
          let exclude = false;
          //user.following.forEach(follow => {
            //if (follow.handle === suggestion.handle) {
              //exclude = true;
            //}
          //})

          if (suggestion.handle === handle) exclude = true

          if (!exclude) {
            suggested.push({
              handle: suggestion.handle,
              pfp: suggestion.pfp
            })
          }
        })

        res.status(200).json({
          success: true,
          message: suggested
        })
      })
 })
}

exports.addFollower = async (req, res) => {
  let decoded;
  try {
    decoded = jwt.verify(req.token, 'secretkey');
  } catch(err) {
      return res.status(500).json({
        success: false,
        message: 'Internal server error occured'
      })
  }

  if (decoded.handle === req.params.handle) {
    return res.status(403).json({
      success: false,
      message: 'Forbidden'
    })
  }

  const followerHandle = decoded.handle;
  const followedHandle = req.params.handle;

  try {
    const followerUser = await User.findOne({ handle: followerHandle }).exec();
    const followedUser = await User.findOne({ handle: followedHandle }).exec();

    followerUser.following.push(followedUser)
    followedUser.followers.push(followerUser)

    await followerUser.save()
    await followedUser.save()

    res.status(200).json({
      success: true
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err
    })
  }
}

exports.getFeed = async (req, res) => {
  let decoded;
  try {
    decoded = jwt.verify(req.token, 'secretkey');
  } catch(err) {
      return res.status(500).json({
        success: false,
        message: 'Internal server error occured'
      })
  }

  if (decoded.handle !== req.params.handle) {
    return res.status(403).json({
      success: false,
      message: 'Forbidden'
    })
  }

  try {
    const user = await User.findOne({ handle: req.params.handle })
      .populate({
        path: 'following',
        populate: {
          path: 'posts'
        }
      })
      .exec()
    const posts = [];
    user.following.forEach(async follow => {
      follow.posts.forEach(async post => {
        posts.push({
          author: follow.handle,
          pfp: follow.pfp,
          image: post.image,
          caption: post.caption
        })
      })
    })


    res.status(200).json({
      success: true,
      data: posts
    })
  } catch(err) {
    res.status(500).json({
      success: false,
      message: err
    })
  }
}

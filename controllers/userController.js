const User = require('../models/user');
const Post = require('../models/post');
const mongoose = require('mongoose')
const multer = require('multer')
const { GridFsStorage } = require('multer-gridfs-storage');
const crypto = require('crypto')
const path = require('path')
const jwt = require('jsonwebtoken');
const async = require('async');

const mongoDB = 'mongodb+srv://ramanjs:hesoyamsa26@dev.wlk2w3u.mongodb.net/instagram?retryWrites=true&w=majority';
mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});
const connection = mongoose.connection

let gfs;
connection.once('open', () => {
  gfs = new mongoose.mongo.GridFSBucket(connection.db, {
    bucketName: 'images'
  })
});

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

const storage = new GridFsStorage({
  url: mongoDB,
  options: { useUnifiedTopology: true },
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }

        const fileName = buf.toString('hex') + path.extname(file.originalname)
        const fileInfo = {
          filename: fileName,
          bucketName: 'images'
        };

        resolve(fileInfo)
      });
    });
  }
});

const store = multer({
  storage,
  limits: { fileSize: 20000000 },
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  }
})

function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) return cb(null, true);

  cb('filetype')
}

exports.uploadMiddleware = (req, res, next) => {
  const upload = store.single('image');
  upload(req, res, function(err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).send('File too large');
    } else if (err) {
      console.log(err)
      if (err === 'filetype') return res.status(400).send('Image files only')
      return res.sendStatus(500);
    } 
    next();
  });
}

exports.editUserProfile = async (req, res) => {
  let decoded;
  try {
    decoded = jwt.verify(req.token, 'secretkey');
  } catch(err) {
      console.log(err)
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

  const { file } = req;
  const { id } = file;

  User.findOneAndUpdate({ handle: req.params.handle }, {pfp: id})
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
}

exports.getImage = (req, res) => {
  const id = req.params.id
  if (!id || id === undefined) {
    return res.status(400).send({
      success: false,
      message: 'No image id'
    })
  }

  const _id = new mongoose.Types.ObjectId(id);

  gfs.find({ _id }).toArray((err, files) => {
    if (!files || files.length === 0) {
      return res.status(400).send({
        success: false,
        message: 'No files exist'
      })
    }
    gfs.openDownloadStream(_id).pipe(res)
  })
}

exports.createPost = async (req, res) => {
  let decoded;
  try {
    decoded = jwt.verify(req.token, 'secretkey');
  } catch(err) {
      console.log(err)
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

  const { file } = req;
  const { id } = file;
  const caption = req.body.caption;

  const post = {
    image: id,
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

      console.log(user.posts)
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

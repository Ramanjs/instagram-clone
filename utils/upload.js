const multer = require('multer')
const cloudinary = require('cloudinary')
const { bufferToDataUri } = require('./file')
//require('dotenv').config()

class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const memoryStorage = multer.memoryStorage()

const upload = multer({
  storage: memoryStorage
})

const uploadToCloudinary = async (fileString, format) => {
  try {
    const { uploader } = cloudinary;
    const res = await uploader.upload(
      `data:image/${format};base64,${fileString}`
    )

    return res
  } catch(err) {
    throw new ErrorHandler(500, error);
  }
}

const uploadImage = async (req, res, next) => {
  try {
    const { file } = req
    if (!file) return next()

    const fileFormat = file.mimetype.split('/')[1]
    const { base64 } = bufferToDataUri(fileFormat, file.buffer)

    const imageDetails = await uploadToCloudinary(base64, fileFormat)

    req.imageUrl = imageDetails.secure_url
    next()
  } catch (error) {
    next(new ErrorHandler(error.statusCode || 500, error.message))
  }
}

module.exports = {
  upload,
  uploadImage,
}

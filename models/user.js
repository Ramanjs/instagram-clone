const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {type: String, required: true, minLength: 1, maxLength: 30},
  handle: {type: String, required: true, minLength: 1, maxLength: 30},
  password: {type: String, required: true},
  bio: String,
  posts: [{type: Schema.Types.ObjectId, ref: 'Post'}],
  followers: [{type: Schema.Types.ObjectId, ref: 'User'}],
});

module.exports = mongoose.model('User', UserSchema);

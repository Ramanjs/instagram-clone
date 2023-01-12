const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {type: String, required: true, minLength: 1, maxLength: 30},
  handle: {type: String, required: true, minLength: 1, maxLength: 30, unique: true},
  password: {type: String, required: true},
  bio: String,
  pfp: String,
  posts: [{type: Schema.Types.ObjectId, ref: 'Post'}],
  followers: [{type: Schema.Types.ObjectId, ref: 'User'}],
  following: [{type: Schema.Types.ObjectId, ref: 'User'}],
});

UserSchema.pre('save', async function(next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

UserSchema.methods.isValidPassword = async function(password) {
  const compare = await bcrypt.compare(password, this.password);
  return compare;
}

module.exports = mongoose.model('User', UserSchema);

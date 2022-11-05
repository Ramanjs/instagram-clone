const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  description: String,
  comments: [{
    user: {type: Schema.Types.ObjectID, ref: 'User'},
    comment: {type: String, minlength: 1}
  }]
});

module.exports = mongoose.model('Post', PostSchema);

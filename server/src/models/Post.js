const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  type: {
    type: String,
    enum: ['plant','flower','branch']
  },
  description: String,
  image: String,
  age: Number,
  title: String,
  userId: String,
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;

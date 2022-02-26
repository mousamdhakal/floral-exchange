const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  type: {
    type: String,
    enum: ['plant', 'flower', 'tree']
  },
  description: String,
  image: String,
  age: Number,
  title: String,
  userId: String,
  date: String,
  location: Object
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;

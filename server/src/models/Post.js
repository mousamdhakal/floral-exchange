const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  type: {
    type: String,
    enum: ['plant', 'flower', 'tree']
  },
  description: String,
  fileName: String,
  age: Number,
  title: String,
  image: String,
  user_id: mongoose.SchemaTypes.ObjectId,
  date: Date,
  location: Object
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;

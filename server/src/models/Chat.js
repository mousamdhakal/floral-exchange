const mongoose = require('mongoose');

const chatSchema = mongoose.Schema({
  message: String,
  sender_id: mongoose.SchemaTypes.ObjectId,
  receiver_id: mongoose.SchemaTypes.ObjectId,
  date: Date,
  read: Boolean
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;

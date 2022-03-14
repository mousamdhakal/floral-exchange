const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
  post_id:  mongoose.SchemaTypes.ObjectId,
  sender_id: mongoose.SchemaTypes.ObjectId,
  receiver_id: mongoose.SchemaTypes.ObjectId,
  date: Date,
  complete: Boolean
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;

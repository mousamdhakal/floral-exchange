const Contact = require('../models/Contact')
const mongoose = require('mongoose')

/**
 * Get chats between users.
 *
 * @param
 * @returns {Promise}
 */
function createContactForPost(senderId, creatorId, postId) {
  const id1 = mongoose.Types.ObjectId(senderId)
  const id2 = mongoose.Types.ObjectId(creatorId)
  const postid = mongoose.Types.ObjectId(postId)

  return new Contact({
    post_id: postid,
    sender_id: id1,
    receiver_id: id2,
    date: new Date(),
    complete: false,
  }).save()
}

/**
 * Get last contact between users.
 *
 * @param
 * @returns {Promise}
 */
function getLastContactBetweenUsers(user1Id, user2Id) {
  console.log(user1Id, user2Id)
  const id1 = mongoose.Types.ObjectId(user1Id)
  const id2 = mongoose.Types.ObjectId(user2Id)
  return Contact.aggregate([
    { $match: { $or: [{ sender_id: id1, receiver_id: id2 }, { sender_id: id2, receiver_id: id1 }] } },
    { $sort: { date: -1 } },
    { $limit: 1 }
  ]).exec()
}

module.exports = {
  createContactForPost,
  getLastContactBetweenUsers,
}

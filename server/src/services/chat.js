const Chat = require('../models/Chat')
const User = require('../models/User')
const mongoose = require('mongoose')

/**
 * Create a message.
 *
 * @param   {Object}  message
 * @returns {Promise}
 */
function createNewMessage(message) {
  message.date = Date.now()
  message.read = false
  const newMessage = new Chat(message)

  return newMessage.save().then((message) => message)
}

/**
 * Get all chats.
 *
 * @param  {String} userId
 * @returns {Promise}
 */
function getAllChats(userId) {
  let userIdObject = mongoose.Types.ObjectId(userId)
  return Chat.aggregate([
    { $match: { $or: [{ sender_id: userIdObject }, { receiver_id: userIdObject }] } },
    { $sort: { date: -1 } },
    {
      $group: {
        _id: {
          $cond: [
            { $eq: ['$sender_id', userIdObject] },
            '$receiver_id',
            '$sender_id',
          ],
        },
        messages: { $push: '$$ROOT' },
      },
    },
    {
      $lookup: {
        from: User.collection.name,
        localField: '_id',
        foreignField: '_id',
        as: 'user',
      },
    },
    { $unwind: '$_id' },
    {
      $replaceRoot: {
        newRoot: { $mergeObjects: [{ $arrayElemAt: ['$user', 0] }, '$$ROOT'] },
      },
    },
    {
      $project: {
        user: 1,
        messages: { $slice: ['$messages', 1] },
      },
    },
  ]).exec()
}

/**
 * Get chats between users.
 *
 * @param   
 * @returns {Promise}
 */
 function getChatBetweenUsers(user1Id, user2Id) {
   const id1 = mongoose.Types.ObjectId(user1Id)
    const id2 = mongoose.Types.ObjectId(user2Id)
    return Chat.aggregate([
      { $match: { $or: [{ sender_id: id1, receiver_id: id2 }, { sender_id: id2, receiver_id: id1 }] } },
      { $sort: { date: -1 } }
    ]).exec()
}


module.exports = {
  createNewMessage,
  getAllChats,
  getChatBetweenUsers
}

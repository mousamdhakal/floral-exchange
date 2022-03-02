const { createNewMessage } = require('../services/chat')
const { getUserFromId } = require('../services/user')

function handleMessageReceived(
  socket,
  io,
  { sender, receiver, message },
  callBack
) {
  const receiverSocket = sequenceNumberByClient.get(receiver.id)
  createNewMessage({
    sender_id: sender.id,
    receiver_id: receiver.id,
    message: message,
  })
    .then((data) => {
      getUserFromId(sender.id)
        .then((senderUser) => {
          socket.emit('message', data, senderUser)
          if (receiverSocket) {
            receiverSocket.emit('message', data, senderUser)
          }
        })
        .catch((err) => {
          console.log(err)
          callBack(err)
        })
    })
    .catch((err) => callBack(err))
  console.log('message received', sender, receiver, message)
}

module.exports = {
  handleMessageReceived,
}

import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import SendIcon from '@mui/icons-material/Send'

const ChatDetails = ({ handleSendMessage }) => {
  const [message, setMessage] = useState('')
  const user = useSelector((state) => state.user.user)
  const lastContact = useSelector((state) => state.chat.contact)
  console.log('>>>>>>>>>>>>>>>>',lastContact)

  const chatDetails = useSelector((state) => state.chat.chatDetails).sort(
    (a, b) => a.date - b.date
  )
  const anotherUser = useSelector((state) => state.chat.user)
  let messagesEnd

  useEffect(() => {
    if (chatDetails.length > 0)
      messagesEnd.scrollIntoView({ behavior: 'smooth' })
  }, [chatDetails])

  const handleMessageSend = (e) => {
    e.preventDefault()
    if (message) {
      handleSendMessage({
        sender: user._id,
        receiver: anotherUser._id,
        message,
      })
      setMessage('')
    }
  }
  return (
    <div className="chat-details">
      {chatDetails && anotherUser && (
        <>
          <div className="chat-details-container">
            <div className="chat-details-user">
              <span>
                {anotherUser.user_name
                  ? anotherUser.user_name
                  : anotherUser.email}
              </span>
            </div>
          </div>
          <div className="chat-details-messages">
            {chatDetails.map((message) => {
              const sentByUser = message.sender_id === user._id
              return (
                <div
                  className={`${
                    sentByUser ? 'user-sent-message' : 'user-received-message'
                  }`}
                  key={message._id}
                >
                  <span className="generic-message">{message.message}</span>
                </div>
              )
            })}
            <div
              ref={(el) => {
                messagesEnd = el
              }}
            ></div>
          </div>
          <div>
            <form onSubmit={handleMessageSend}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Enter your message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                InputProps={{
                  classes: {
                    root: 'messageField',
                  },
                  endAdornment: (
                    <IconButton onClick={handleMessageSend}>
                      <SendIcon />
                    </IconButton>
                  ),
                }}
              />
            </form>
          </div>
        </>
      )}
    </div>
  )
}

export default ChatDetails

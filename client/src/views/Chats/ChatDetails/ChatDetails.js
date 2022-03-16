import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import { Typography } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import { IMAGE_ENDPOINT } from '../../../utils/constants'
import FlowerPlaceholder from '../../../components/FlowerPlaceholder/FlowerPlaceholder'
import * as postActions from '../../../actions/postActions';
import * as chatActions from '../../../actions/chatActions'

const ChatDetails = ({ handleSendMessage }) => {
  const [message, setMessage] = useState('')
  const user = useSelector((state) => state.user.user)
  const lastContact = useSelector((state) => state.chat.contact)
  console.log('>>>>>>>>>>>>>>>>', lastContact)

  const chatDetails = useSelector((state) => state.chat.chatDetails).sort(
    (a, b) => a.date - b.date
  )
  const anotherUser = useSelector((state) => state.chat.user)
  let messagesEnd

  useEffect(() => {
    if (chatDetails.length > 0)
      messagesEnd.scrollIntoView({ behavior: 'smooth' })
  }, [chatDetails])

  useEffect(() => {
    if(anotherUser) {
      dispatch(chatActions.getContact(anotherUser._id))
    }
  },[anotherUser])

  const dispatch = useDispatch()

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

  const handleExchange = () => {
    if(lastContact && lastContact._id) {
      dispatch(postActions.updatePost(lastContact._id, {exchanged: true}))
      dispatch(chatActions.getContact(anotherUser._id, true))
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
          {lastContact && (
            <>
              <p className="chat-contact-info">Contacted for:</p>
              <div className="chat-last-contact">
                <div className="contact-post-image">
                  {lastContact.image ? (
                    <img
                      src={IMAGE_ENDPOINT + '/' + lastContact.image}
                      alt="item"
                    />
                  ) : (
                    <FlowerPlaceholder
                      containerHeight="auto"
                      containerWidth="100%"
                      borderRadius="0px"
                      width="20vw"
                    />
                  )}
                </div>
                <div className="contact-post-details">
                  <Typography className="post-title">
                    {lastContact.title}
                  </Typography>
                  <Typography className="post-date">
                    Posted on: {lastContact.date}
                  </Typography>
                  <Typography className="post-desc">
                    {lastContact.description}
                  </Typography>
                  {!lastContact.exchanged ? (
                    <>
                      {lastContact.user_id !== user._id ? (
                        <div className="exchange-button-container">
                          <button disabled>Requested for exchange</button>
                        </div>
                      ) : (
                        <div className="exchange-action-button">
                          <button onClick={handleExchange}>Exchange</button>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="exchange-action-button completed">
                      <button disabled>Exchange Completed</button>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
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

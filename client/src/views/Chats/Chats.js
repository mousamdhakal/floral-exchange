import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import io from 'socket.io-client'
import { TextField } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'
import store from '../../store'

import * as uiActions from '../../actions/uiActions'
import * as userActions from '../../actions/userActions'
import * as chatActions from '../../actions/chatActions'

import './Chats.scss'
import ChatLists from './ChatLists/ChatLists'
import ChatDetails from './ChatDetails/ChatDetails'
import { SOCKET_ENDPOINT } from '../../utils/constants'

let user = store.getState().user.user
let socket
socket = io(SOCKET_ENDPOINT, { auth: { userId: user && user._id ? user._id : '' } })

const Chats = () => {
  let user = useSelector((state) => state.user.user)
  let users = useSelector((state) => state.user.users)
  let chats = useSelector((state) => state.chat.chats)

  const [state, setState] = useState({
    message: '',
    sender: { id: user ? user._id : '' },
    receiver: null,
  })
  const [chat, setChat] = useState([])
  const dispatch = useDispatch()

  // Check if there is chat list if not call api to get chat list
  useEffect(() => {
    if (!chats || !chats.length || chats.length < 1) {
      dispatch(chatActions.getChats())
    } else {
      console.log(chats)
    }
  }, [])

  // On getting new message from socket pass to update redux store
  useEffect(() => {
    socket.on('message', (data, senderUser) => {
      dispatch(chatActions.setNewMessage(data,senderUser))
    })
    dispatch(uiActions.setActive('chats'))
    dispatch(userActions.getUsers())
  }, [])


  // const onTextChange = (e) => {
  //   setState({ ...state, [e.target.name]: e.target.value })
  // }

  const onMessageSubmit = (data) => {
    const { sender, receiver, message } = data
    if (sender && receiver && message)
      socket.emit(
        'message',
        { sender: {id: sender}, receiver: { id: receiver }, message },
        handleError
      )
  }

  const handleError = (err) => {
    console.log(err)
  }

  // const renderChat = () => {
  //   return chat.map((chat, index) => (
  //     <div key={index}>
  //       <h3>
  //         {chat.sender.user_name} : <span> {chat.message.message} </span>
  //       </h3>
  //     </div>
  //   ))
  // }

  const mappedUsers = users.map((user) => {
    return { ...user, label: user.userName ? user.userName : user.email }
  })

  return (
    // <div>
    //   <form onSubmit={onMessageSubmit}>
    //     <h1>Messenger</h1>
    //     <div className="name-field">
    //       {/* <TextField
    //         name="receiver"
    //         value={state.receiver}
    //         label="Receiver"
    //       /> */}
    //       <Autocomplete
    //         disablePortal
    //         value={state.receiver}
    //         onChange={(event, newValue) => {
    //           onTextChange({ target: { name: 'receiver', value: newValue } })
    //         }}
    //         isOptionEqualToValue={(option, value) => {
    //           return option._id === value._id
    //         }}
    //         id="combo-box-demo"
    //         label="Receiver"
    //         name="receiver"
    //         options={mappedUsers}
    //         sx={{ width: 300 }}
    //         renderInput={(params) => <TextField {...params} label="Receiver" />}
    //       />
    //     </div>
    //     <div>
    //       <TextField
    //         name="message"
    //         onChange={(e) => onTextChange(e)}
    //         value={state.message}
    //         label="Message"
    //         variant="outlined"
    //       />
    //     </div>
    //     <button>Send Message</button>
    //   </form>
    //   <div className="render-chat">
    //     <h1> Chat log</h1>
    //     {renderChat()}
    //   </div>
    // </div>
    <div className='chats-container'>
      <div className="chats-list">
        <ChatLists chats={chats} />
      </div>
      <div className="chat-details">
        <ChatDetails handleSendMessage={onMessageSubmit}/>
      </div>
    </div>
  )
}

export default Chats

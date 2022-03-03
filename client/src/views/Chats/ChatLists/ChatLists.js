import SearchOutlined from '@mui/icons-material/SearchOutlined'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import { timeSince } from '../../../utils/utils'
import { useDispatch } from 'react-redux'
import * as chatActions from '../../../actions/chatActions'


const ChatLists = ({chats}) => {
  const dispatch = useDispatch()

  const fetchMessages = (user) => {
    dispatch(chatActions.getChatDetails(user))
  }
  
  return (
    <>
      {/* <div className="Searchbox">
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search Users"
          InputProps={{
            classes: {
              root: 'searchBar',
            },
            startAdornment: (
              <IconButton>
                <SearchOutlined />
              </IconButton>
            ),
          }}
        />
      </div> */}
      {chats &&
        chats.length > 0 &&
        chats.map((chat) => (
          <div className="chat-list-item" key={chat._id} onClick={() => fetchMessages(chat.user[0])}>
            <div className="chat-list-item-header">
              <div className="chat-list-item-header-left">
                <div className="chat-list-item-header-left-avatar">
                  <img src='./assets/images/profile-icon.svg' alt="avatar" />
                </div>
                <div className="chat-list-item-header-left-info">
                  <div className="chat-list-item-header-left-info-name">
                    {/* {chat.name} */}
                    {/* Mousam Dhakal */}
                    {chat.user[0].user_name ? chat.user[0].user_name : chat.user[0].email}
                  </div>
                  <div className="chat-list-item-header-left-info-last-message">
                    {/* {chat.lastMessage} */}
                    {/* Hello */}
                    {chat.messages[0].message}
                  </div>
                </div>
              </div>
              <div className="chat-list-item-header-right">
                <div className="chat-list-item-header-right-time">
                  {/* {chat.time} */}
                  {/* 2 days ago */}
                  {timeSince(new Date(chat.messages[0].date))}
                </div>
              </div>
            </div>
          </div>
        ))}
    </>
  )
}

export default ChatLists

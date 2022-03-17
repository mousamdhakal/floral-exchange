import * as chatActions from '../actions/chatActions'

const INITIAL_STATE = {
  error: null,
  isCalling: false,
  chats: [],
  user: null,
  chatDetails: [],
  contact: null
}

function chatReducers(state = INITIAL_STATE, action) {
  switch (action.type) {
    case chatActions.GET_CHATS_REQUEST:
      return {
        ...state,
        error: null,
        isCalling: true,
        chats: [],
      }

    case chatActions.GET_CHATS_SUCCESS:
      return {
        ...state,
        error: null,
        isCalling: false,
        chats: action.payload.chats,
      }

    case chatActions.GET_CHATS_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        isCalling: false,
        chats: [],
      }

    case chatActions.GET_CHAT_DETAILS_REQUEST:
      return {
        ...state,
        error: null,
        isCalling: true,
        user: action.payload,
        chatDetails: [],
      }

    case chatActions.GET_CHAT_DETAILS_SUCCESS:
      const dateFormattedChats = action.payload.chats.map((chat) => {
        const date = new Date(chat.date)
        return {
          ...chat,
          date,
        }
      })

      return {
        ...state,
        error: null,
        isCalling: false,
        chatDetails: dateFormattedChats,
      }

    case chatActions.GET_CHAT_DETAILS_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        isCalling: false,
        chatDetails: [],
        user: null,
      }

    case chatActions.SEND_CHAT_REQUEST:
      return {
        ...state,
        error: null,
        isCalling: true,
      }

    case chatActions.SEND_CHAT_SUCCESS:
      return {
        ...state,
        error: null,
        isCalling: false,
        chatDetails: [...state.chatDetails, action.payload],
      }

    case chatActions.SEND_CHAT_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        isCalling: false,
      }

    case chatActions.SET_NEW_MESSAGE:
      let details = [...state.chatDetails]
      let chats = [...state.chats]
      if (
        state.user &&
        (state.user._id === action.payload.message.sender_id ||
          state.user._id === action.payload.message.receiver_id)
      ) {
        details.push(action.payload.message)
      }
      if (state.chats && state.chats.length > 0) {
        const chat = chats.find(
          (chat) =>
            chat.user[0]._id === action.payload.message.sender_id ||
            chat.user[0]._id === action.payload.message.receiver_id
        )
        if (chat) {
          chat.messages = [action.payload.message]
          chats.map((oldChat) => {
            if (chat._id === oldChat._id) {
              oldChat = chat
            }
            return oldChat
          })
        } else {
          // TODO: Need to get user details from user id for new chat and push that to chats list
        }
      }



      return {
        ...state,
        error: null,
        isCalling: false,
        chatDetails: details.filter((v,i,a)=>a.findIndex(t=>(t._id===v._id))===i),
        chats: chats,
      }

    case chatActions.CONTACT_USER_REQUEST:
      return {
        ...state,
        error: null,
        isCalling: true,
      }

    case chatActions.CONTACT_USER_SUCCESS:
      return {
        ...state,
        error: null,
        isCalling: false,
      }

    case chatActions.CONTACT_USER_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        isCalling: false,
      }

      case chatActions.GET_CONTACT_REQUEST:
        return {
          ...state,
          error: null,
          isCalling: true,
          contact: null
        }
  
      case chatActions.GET_CONTACT_SUCCESS:
        return {
          ...state,
          error: null,
          isCalling: false,
          contact: action.payload
        }
  
      case chatActions.GET_CONTACT_FAILURE:
        return {
          ...state,
          error: action.payload.error,
          isCalling: false,
          contact: null
        }

    default:
      return state
  }
}

export default chatReducers

export const GET_CHATS_REQUEST = 'GET_CHATS_REQUEST';
export const GET_CHATS_SUCCESS = 'GET_CHATS_SUCCESS';
export const GET_CHATS_FAILURE = 'GET_CHATS_FAILURE';

export const GET_CHAT_DETAILS_REQUEST = 'GET_CHAT_DETAILS_REQUEST';
export const GET_CHAT_DETAILS_SUCCESS = 'GET_CHAT_DETAILS_SUCCESS';
export const GET_CHAT_DETAILS_FAILURE = 'GET_CHAT_DETAILS_FAILURE';

export const SEND_CHAT_REQUEST = 'SEND_CHAT_REQUEST';
export const SEND_CHAT_SUCCESS = 'SEND_CHAT_SUCCESS';
export const SEND_CHAT_FAILURE = 'SEND_CHAT_FAILURE';

export const CONTACT_USER_REQUEST = 'CONTACT_USER_REQUEST';
export const CONTACT_USER_SUCCESS = 'CONTACT_USER_SUCCESS';
export const CONTACT_USER_FAILURE = 'CONTACT_USER_FAILURE';

export const GET_CONTACT_REQUEST = 'GET_CONTACT_REQUEST';
export const GET_CONTACT_SUCCESS = 'GET_CONTACT_SUCCESS';
export const GET_CONTACT_FAILURE = 'GET_CONTACT_FAILURE';

export const SET_NEW_MESSAGE = 'SET_NEW_MESSAGE';

export const getChats = () => ({
  type: GET_CHATS_REQUEST,
  payload: null
})

export const getChatsSuccess = (chats) => ({
  type: GET_CHATS_SUCCESS,
  payload: chats
});

export const getChatsFailure = (error) => ({
  type: GET_CHATS_FAILURE,
  payload: error
});

export const getChatDetails = (user) => ({
  type: GET_CHAT_DETAILS_REQUEST,
  payload: user
})

export const getChatDetailsSuccess = (chats) => ({
  type: GET_CHAT_DETAILS_SUCCESS,
  payload: chats
});

export const getChatDetailsFailure = (error) => ({
  type: GET_CHAT_DETAILS_FAILURE,
  payload: error
});

export const sendChat = (chat) => ({
  type: SEND_CHAT_REQUEST,
  payload: chat
})

export const sendChatSuccess = (chat) => ({
  type: SEND_CHAT_SUCCESS,
  payload: chat
});

export const sendChatFailure = (error) => ({
  type: SEND_CHAT_FAILURE,
  payload: error
});

export const setNewMessage = (message,senderUser) => ({
  type: SET_NEW_MESSAGE,
  payload: {message: message, senderUser: senderUser}
});

export const contactUser = (post, history) => ({
  type: CONTACT_USER_REQUEST,
  payload: post,
  history: history
})

export const contactUserSuccess = (chat) => ({
  type: CONTACT_USER_SUCCESS,
  payload: chat
});

export const contactUserFailure = (error) => ({
  type: CONTACT_USER_FAILURE,
  payload: error
});

export const getContact = (userId, waitForUpdate) => ({
  type: GET_CONTACT_REQUEST,
  payload: userId,
  postUpdate: waitForUpdate
})

export const getContactSuccess = (contact) => ({
  type: GET_CONTACT_SUCCESS,
  payload: contact
});

export const getContactFailure = (error) => ({
  type: GET_CONTACT_FAILURE,
  payload: error
});


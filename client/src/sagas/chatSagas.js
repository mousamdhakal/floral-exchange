import { call, put, takeLatest, take } from 'redux-saga/effects'
import {
  getAllChats,
  getChatWithUser,
  contactUserForPost,
  getContactWithUser
} from '../services/http'
import * as chatActions from '../actions/chatActions'
import * as postActions from '../actions/postActions'
import { toast } from 'react-toastify'

function* getChats(action) {
  try {
    const response = yield call(getAllChats, action.payload)
    yield put({ type: chatActions.GET_CHATS_SUCCESS, payload: response.data })
  } catch (error) {
    yield put({ type: chatActions.GET_CHATS_FAILURE, payload: error })
    toast.error(error && error.message ? error.message : 'Failed to get chats')
  }
}

function* getChatDetails(action) {
  try {
    if (action.payload.contact) {
      yield take(chatActions.CONTACT_USER_SUCCESS)
    }
    const response = yield call(getChatWithUser, action.payload._id)
    yield put({
      type: chatActions.GET_CHAT_DETAILS_SUCCESS,
      payload: response.data,
    })
  } catch (error) {
    yield put({ type: chatActions.GET_CHAT_DETAILS_FAILURE, payload: error })
    toast.error(
      error && error.message ? error.message : 'Failed to get chat details'
    )
  }
}

function* contactUser(action) {
  try {
    const response = yield call(contactUserForPost, action.payload._id)
    yield put({
      type: chatActions.CONTACT_USER_SUCCESS,
      payload: response.data,
    })
    action.history.push('/chats')
  } catch (error) {
    yield put({ type: chatActions.CONTACT_USER_FAILURE, payload: error })
    toast.error(error && error.message ? error.message : 'Failed to get chats')
  }
}


function* getContact(action) {
  try {
    if(action.postUpdate) {
      yield take(postActions.UPDATE_POST_SUCCESS)
    }
    const response = yield call(getContactWithUser, action.payload)
    yield put({
      type: chatActions.GET_CONTACT_SUCCESS,
      payload: response.data.contact,
    })
  } catch (error) {
    yield put({ type: chatActions.GET_CONTACT_FAILURE, payload: error })
    toast.error(error && error.message ? error.message : 'Failed to get last contact with user')
  }
}

function* chatSagas() {
  yield takeLatest(chatActions.GET_CHATS_REQUEST, getChats)
  yield takeLatest(chatActions.GET_CHAT_DETAILS_REQUEST, getChatDetails)
  yield takeLatest(chatActions.CONTACT_USER_REQUEST, contactUser)
  yield takeLatest(chatActions.GET_CONTACT_REQUEST, getContact)
}

export default chatSagas

import { call, put, takeLatest } from 'redux-saga/effects'
import {getAllChats, getChatWithUser } from '../services/http'
import * as chatActions from '../actions/chatActions'
import { toast } from 'react-toastify'

function* getChats(action) {
  try {
    const response = yield call(getAllChats, action.payload);
    yield put({ type: chatActions.GET_CHATS_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: chatActions.GET_CHATS_FAILURE, payload: error });
    toast.error(error && error.message ? error.message : 'Failed to get chats');
  }
}

function* getChatDetails(action) {
  try {
    const response = yield call(getChatWithUser, action.payload._id);
    yield put({ type: chatActions.GET_CHAT_DETAILS_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: chatActions.GET_CHAT_DETAILS_FAILURE, payload: error });
    toast.error(error && error.message ? error.message : 'Failed to get chat details');
  }
}

function* chatSagas() {
  yield takeLatest(chatActions.GET_CHATS_REQUEST, getChats);
  yield takeLatest(chatActions.GET_CHAT_DETAILS_REQUEST, getChatDetails);
}

export default chatSagas;
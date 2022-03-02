import { call, put, takeLatest } from 'redux-saga/effects'
import {getAllChats, getChatWithUser } from '../services/http'
import * as chatActions from '../actions/chatActions'

function* getChats(action) {
  try {
    const response = yield call(getAllChats, action.payload);
    yield put({ type: chatActions.GET_CHATS_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: chatActions.GET_CHATS_FAILURE, payload: error });
  }
}

function* getChatDetails(action) {
  try {
    const response = yield call(getChatWithUser, action.payload._id);
    yield put({ type: chatActions.GET_CHAT_DETAILS_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: chatActions.GET_CHAT_DETAILS_FAILURE, payload: error });
  }
}

function* chatSagas() {
  yield takeLatest(chatActions.GET_CHATS_REQUEST, getChats);
  yield takeLatest(chatActions.GET_CHAT_DETAILS_REQUEST, getChatDetails);
}

export default chatSagas;
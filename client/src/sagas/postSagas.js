import { call, put, takeLatest } from 'redux-saga/effects'
import { createPost, getAllPosts } from '../services/http'
import * as postActions from '../actions/postActions'

function* createNewPost(action) {
  try {
    console.log(action)
    const response = yield call(createPost, action.payload);
    yield put({ type: 'CREATE_POST_SUCCESS', payload: response.data });
  } catch (error) {
    yield put({ type: 'CREATE_POST_FAILURE', payload: error });
  }
}

function* getPosts(action) {
  try {
    const response = yield call(getAllPosts, action.payload);
    yield put({ type: 'GET_POSTS_SUCCESS', payload: response.data });
  } catch (error) {
    yield put({ type: 'GET_POSTS_FAILURE', payload: error });
  }
}

function* postSagas() {
  yield takeLatest(postActions.CREATE_POST_REQUEST, createNewPost);
  yield takeLatest(postActions.GET_POSTS_REQUEST, getPosts);

}

export default postSagas;
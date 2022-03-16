import { call, put, takeLatest } from 'redux-saga/effects'
import { createPost, getAllPosts, getPostsForUserAPI, updatePost, deletePost } from '../services/http'
import * as postActions from '../actions/postActions'
import { toast } from 'react-toastify'

function* createNewPost(action) {
  let response
  try {
    response = yield call(createPost, action.payload)
    yield put({ type: postActions.CREATE_POST_SUCCESS, payload: response.data })
    toast.success('Post created successfully')
  } catch (error) {
    const errorObject = error.response.data.error
    yield put({ type: postActions.CREATE_POST_FAILURE, payload: error })
    if (errorObject.details && errorObject.details.length > 0) {
      errorObject.details.forEach((err) => {
        toast.error(err.message)
      })
    }
  }
}

function* getPosts(action) {
  try {
    const response = yield call(getAllPosts, action.payload)
    yield put({ type: postActions.GET_POSTS_SUCCESS, payload: response.data })
  } catch (error) {
    yield put({ type: postActions.GET_POSTS_FAILURE, payload: error })
    toast.error(error && error.message ? error.message : 'Failed to get posts')
  }
}

function* getPostsForUser(action) {
  try {
    const response = yield call(getPostsForUserAPI, action.payload)
    yield put({
      type: postActions.GET_USER_POSTS_SUCCESS,
      payload: response.data,
    })
  } catch (error) {
    yield put({ type: postActions.GET_USER_POSTS_FAILURE, payload: error })
    toast.error(error && error.message ? error.message : 'Failed to get user posts')
  }
}

function* updatePostSaga(action) {
  try {
    const response = yield call(updatePost, action.id,action.payload);
    yield put({ type: postActions.UPDATE_POST_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: postActions.UPDATE_POST_FAILURE, payload: error });
  }
}

function* deletePostSaga(action) {
  try {
    const response = yield call(deletePost, action.payload);
    yield put({ type: postActions.DELETE_POST_SUCCESS, payload: action.payload });
    toast.success('Post deleted successfully')
  } catch (error) {
    yield put({ type: postActions.DELETE_POST_FAILURE, payload: error });
    toast.error(error && error.message ? error.message : 'Failed to delete post')
  }
}

function* postSagas() {
  yield takeLatest(postActions.CREATE_POST_REQUEST, createNewPost);
  yield takeLatest(postActions.GET_POSTS_REQUEST, getPosts);
  yield takeLatest(postActions.GET_USER_POSTS_REQUEST, getPostsForUser);
  yield takeLatest(postActions.UPDATE_POST_REQUEST, updatePostSaga);
  yield takeLatest(postActions.DELETE_POST_REQUEST, deletePostSaga);
}

export default postSagas

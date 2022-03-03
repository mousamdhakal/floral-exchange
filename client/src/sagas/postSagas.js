import { call, put, takeLatest } from 'redux-saga/effects'
import { createPost, getAllPosts, getPostsForUserAPI } from '../services/http'
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

function* postSagas() {
  yield takeLatest(postActions.CREATE_POST_REQUEST, createNewPost)
  yield takeLatest(postActions.GET_POSTS_REQUEST, getPosts)
  yield takeLatest(postActions.GET_USER_POSTS_REQUEST, getPostsForUser)
}

export default postSagas

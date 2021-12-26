import * as postActions from '../actions/postActions'

const INITIAL_STATE = {
  error: null,
  post: null,
  isCalling: false,
  posts: [],
}

function postReducers(state = INITIAL_STATE, action) {
  switch (action.type) {
    case postActions.CREATE_POST_REQUEST:
      return {
        ...state,
        error: null,
        isCalling: true,
        post: action.payload.post,
      }

    case postActions.CREATE_POST_SUCCESS:
      return {
        ...state,
        error: null,
        isCalling: false,
        post: action.payload.post,
      }

    case postActions.CREATE_POST_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        isCalling: false,
        post: null,
      }
    case postActions.GET_POSTS_REQUEST:
      return {
        ...state,
        error: null,
        isCalling: true,
      }

    case postActions.GET_POSTS_SUCCESS:
      return {
        ...state,
        error: null,
        isCalling: false,
        posts: action.payload.posts,
      }

    case postActions.GET_POSTS_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        isCalling: false,
        posts: [],
      }
    default:
      return state
  }
}

export default postReducers

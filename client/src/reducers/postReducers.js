import * as postActions from '../actions/postActions'

const INITIAL_STATE = {
  error: null,
  post: null,
  isCalling: false,
  posts: [],
  userPosts: [],
}

function postReducers(state = INITIAL_STATE, action) {
  switch (action.type) {
    case postActions.CREATE_POST_REQUEST:
      return {
        ...state,
        error: null,
        isCalling: true,
        post: null,
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
    case postActions.GET_USER_POSTS_REQUEST:
      return {
        ...state,
        error: null,
        isCalling: true,
      }

    case postActions.GET_USER_POSTS_SUCCESS:
      return {
        ...state,
        error: null,
        isCalling: false,
        userPosts: action.payload.posts,
      }

    case postActions.GET_USER_POSTS_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        isCalling: false,
        userPosts: [],
      }

    case postActions.UPDATE_POST_REQUEST:
      return {
        ...state,
        error: null,
        isCalling: true,
      }

    case postActions.UPDATE_POST_SUCCESS:
      return {
        ...state,
        error: null,
        isCalling: false,
        post: action.payload.post,
      }

    case postActions.UPDATE_POST_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        isCalling: false,
      }

    case postActions.DELETE_POST_REQUEST:
      return {
        ...state,
        error: null,
        isCalling: true,
      }

    case postActions.DELETE_POST_SUCCESS:
      let newUserPosts = state.userPosts.filter(post => post._id !== action.payload)
      // console.log(action.payload)
      return {
        ...state,
        error: null,
        isCalling: false,
        userPosts: newUserPosts,
      }

    case postActions.DELETE_POST_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        isCalling: false,
      }

    default:
      return state
  }
}

export default postReducers

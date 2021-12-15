import * as postActions from '../actions/postActions'

const INITIAL_STATE = {
  error: null,
  post: null,
  isCalling: false,
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

    default:
      return state
  }
}

export default postReducers

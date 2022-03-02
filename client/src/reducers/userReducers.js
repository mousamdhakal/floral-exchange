import * as userActions from '../actions/userActions'

let token = localStorage.getItem('jwtToken')
let userJson = localStorage.getItem('user')
let user = userJson ? JSON.parse(userJson) : null

//Initial state of user
const INITIAL_STATE = {
  user: user,
  isAuthenticated: token ? true : false,
  loginMessage: null,
  isCalling: false,
  error: null,
  users: []
}

function userReducers(state = INITIAL_STATE, action) {
  switch (action.type) {
    case userActions.REGISTER_REQUEST:
      return { ...state, isCalling: true }

    case userActions.REGISTER_SUCCESS:
      return {
        ...state,
        isCalling: false,
        isAuthenticated: action.payload.token ? true : false,
        loginMessage: action.payload.message,
      }

    case userActions.REGISTER_FAILURE:
      return {
        ...state,
        isCalling: false,
        loginMessage: action.payload.message,
        isAuthenticated: false,
        error: action.payload
      }

    case userActions.LOGIN_REQUEST:
      return { ...state, isCalling: true }

    case userActions.LOGIN_SUCCESS:
      console.log(action.payload)
      return {
        ...state,
        user: action.payload.data,
        isAuthenticated: action.payload.token ? true : false,
        isCalling: false,
        loginMessage: action.payload.message,
      }

    case userActions.LOGIN_FAILURE:
      return {
        ...state,
        isCalling: false,
        isAuthenticated: false,
        loginMessage: action.payload.message,
        error: action.payload
      }

      case userActions.GET_USERS_REQUEST:
        return {
          ...state,
          error: null,
          isCalling: true,
        }
  
      case userActions.GET_USERS_SUCCESS:
        return {
          ...state,
          error: null,
          isCalling: false,
          users: action.payload.users,
        }
  
      case userActions.GET_USERS_FAILURE:
        return {
          ...state,
          error: action.payload.error,
          isCalling: false,
          users: [],
        }

    default:
      return state
  }
}

export default userReducers

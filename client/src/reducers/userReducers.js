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
  error: null
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

    default:
      return state
  }
}

export default userReducers

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const registerRequest = (user, history) => ({
  type: REGISTER_REQUEST,
  payload: user,
  history: history
});

export const registerSuccess = (message) => ({
  type: REGISTER_SUCCESS,
  payload: message
});

export const registerFailure = (error) => ({
  type: REGISTER_FAILURE,
  payload: error
});

export const loginRequest = (user, history) => ({
  type: LOGIN_REQUEST,
  payload: user,
  history: history
});

export const loginSuccess = (props) => ({
  type: LOGIN_SUCCESS,
  payload: props
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error
});




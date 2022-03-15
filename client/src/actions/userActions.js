export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const GET_USERS_REQUEST = 'GET_USERS_REQUEST';
export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
export const GET_USERS_FAILURE = 'GET_USERS_FAILURE';

export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILURE = 'GET_USER_FAILURE';

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE';

export const SET_AUTHENTICATED = 'SET_AUTHENTICATED';

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

export const getUsers = () => ({
  type: GET_USERS_REQUEST,
  payload: null
})

export const getUsersSuccess = (users) => ({
  type: GET_USERS_SUCCESS,
  payload: users
});

export const getUsersFailure = (error) => ({
  type: GET_USERS_FAILURE,
  payload: error
});

export const getUser = (id) => ({
  type: GET_USER_REQUEST,
  payload: id,
})

export const getUserSuccess = (user) => ({
  type: GET_USER_SUCCESS,
  payload: user,
});

export const getUserFailure = (error) => ({
  type: GET_USER_FAILURE,
  payload: error
});

export const updateUser = (userData) => ({
  type: UPDATE_USER_REQUEST,
  payload: userData
})

export const updateUserSuccess = (user) => ({
  type: UPDATE_USER_SUCCESS,
  payload: user
});

export const updateUserFailure = (error) => ({
  type: UPDATE_USER_FAILURE,
  payload: error
});

export const setAuthenticated = (isAuthenticated) => ({
  type: SET_AUTHENTICATED,
  payload: isAuthenticated
});




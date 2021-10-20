export const SET_USER = 'SET_USER';
export const REMOVE_USER = 'REMOVE_USER';
export const SET_LOG_IN_MESSAGE = 'SET_LOG_IN_MESSAGE';
export const CLEAR_LOG_IN_MESSAGE = 'CLEAR_LOG_IN_MESSAGE';
export const SET_AUTHENTICATED = 'SET_AUTHENTICATED';

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export const setAuthenticated = () => ({
  type: SET_AUTHENTICATED,
});

export const removeUser = () => ({
  type: REMOVE_USER,
});

export const setLogInMessage = (message) => ({
  type: SET_LOG_IN_MESSAGE,
  payload: message,
});

export const clearLogInMessage = () => ({
  type: CLEAR_LOG_IN_MESSAGE,
});


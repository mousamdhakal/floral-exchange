import { combineReducers } from 'redux';

import userReducers from './userReducers';
import uiReducers from './uiReducers'
import postReducers from './postReducers';
import chatReducers from './chatReducers'

const reducer = combineReducers({
  user: userReducers,
  ui: uiReducers,
  post: postReducers,
  chat: chatReducers
});

export default reducer;

import { combineReducers } from 'redux';

import userReducers from './userReducers';
import uiReducers from './uiReducers'
import postReducers from './postReducers';

const reducer = combineReducers({
  user: userReducers,
  ui: uiReducers,
  post: postReducers
});

export default reducer;

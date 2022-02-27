import { call, put, takeLatest } from 'redux-saga/effects'
import { register, login } from '../services/http'
import setAuthorizationToken from '../utils/authorizationHeader';
import * as userActions from '../actions/userActions';

function* registerUser(action) {
  try {
    const response = yield call(register, action.payload);
    if (response.data.token) {
      localStorage.setItem('jwtToken', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.data));
      setAuthorizationToken(response.data.token);
    }
    yield put({ type: userActions.REGISTER_SUCCESS, payload: response.data });
    action.history.push('/dashboard');
  } catch (error) {
    yield put({ type: userActions.REGISTER_FAILURE, payload: error });
  }
}

function* loginUser(action) {
  try {
    const response = yield call(login, action.payload);
    if (response.data.token) {
      localStorage.setItem('jwtToken', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.data));
      setAuthorizationToken(response.data.token);
    }
    yield put({ type: userActions.LOGIN_SUCCESS, payload: response.data });
    action.history.push('/');
  } catch (error) {
    yield put({ type: userActions.LOGIN_FAILURE, payload: error });
  }
}

function* userSagas() {
  yield takeLatest(userActions.REGISTER_REQUEST, registerUser);
  yield takeLatest(userActions.LOGIN_REQUEST, loginUser);
}

export default userSagas;
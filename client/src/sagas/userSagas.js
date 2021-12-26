import { call, put, takeLatest } from 'redux-saga/effects'
import { register, login } from '../services/http'
import { setAuthorizationToken } from '../utils/authorizationHeader';

function* registerUser(action) {
  try { 
    const response = yield call(register, action.payload);
    yield put({ type: "REGISTER_SUCCESS", payload: response.data });
    action.history.push('/dashboard');
  } catch (error) {
    yield put({ type: "REGISTER_FAILURE", payload: error });
  }
}

function* loginUser(action) {
  try {
    const response = yield call(login, action.payload);
    if(response.data.token){
      localStorage.setItem('jwtToken', response.data.token);
      setAuthorizationToken(response.data.token);
    }
    yield put({ type: "LOGIN_SUCCESS", payload: response.data });
    action.history.push('/');
  } catch (error) {
    yield put({ type: "LOGIN_FAILURE", payload: error });
  }
}

function* userSagas() {
  yield takeLatest("REGISTER_REQUEST", registerUser);
  yield takeLatest("LOGIN_REQUEST", loginUser);
}

export default userSagas;
import { call, put, takeLatest } from 'redux-saga/effects'
import { register, login, getAllUsers } from '../services/http'
import setAuthorizationToken from '../utils/authorizationHeader';
import * as userActions from '../actions/userActions';
import { toast } from 'react-toastify';

function* registerUser(action) {
  try {
    const response = yield call(register, action.payload);
    if (response.data.token) {
      localStorage.setItem('jwtToken', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.data));
      setAuthorizationToken(response.data.token);
    }
    yield put({ type: userActions.REGISTER_SUCCESS, payload: response.data });
    toast.success('Registration Successful')
    action.history.push('/dashboard');
  } catch (error) {
    yield put({ type: userActions.REGISTER_FAILURE, payload: error });
    toast.error(error && error.message ? error.message : 'Registration Failed')
  }
}

function* getUsers(action) {
  try {
    const response = yield call(getAllUsers, action.payload);
    yield put({ type: userActions.GET_USERS_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: userActions.GET_USERS_FAILURE, payload: error });
    toast.error(error && error.message ? error.message : 'Failed to get users')
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
    toast.success('Login Successful')
    action.history.push('/');
  } catch (error) {
    yield put({ type: userActions.LOGIN_FAILURE, payload: error });
    toast.error(error && error.message ? error.message : 'Login Failed')
  }
}

function* userSagas() {
  yield takeLatest(userActions.REGISTER_REQUEST, registerUser);
  yield takeLatest(userActions.LOGIN_REQUEST, loginUser);
  yield takeLatest(userActions.GET_USERS_REQUEST, getUsers)
}

export default userSagas;
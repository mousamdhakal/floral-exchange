import { call, put, takeLatest } from 'redux-saga/effects'

function* removeUser(action) {
   console.log('remove user')
}

function* mySaga() {
  yield takeLatest("REMOVE_USER", removeUser);
}

export default mySaga;
import { all } from 'redux-saga/effects'
import postSagas from './postSagas'

import userSagas from './userSagas'
import chatSagas from './chatSagas'

export default function* rootSaga() {
  yield all([userSagas(), postSagas(), chatSagas()])
}

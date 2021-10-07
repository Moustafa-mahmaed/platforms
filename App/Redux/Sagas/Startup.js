import { put } from 'redux-saga/effects'
import Login from '../Actions/Auth/Login'

// process STARTUP actions
export function * startup () {
  yield put(Login.checkToken())
}

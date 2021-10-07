import { call, put } from 'redux-saga/effects'
import get from 'lodash/get'
import SignupActions from '../../../Redux/Actions/Auth/Signup'
import Constants from '../../../Services/Constants'
import AsyncStorage from '@react-native-community/async-storage'

const { TOKEN_KEY, USER_KEY } = Constants

export function * signup (api, action) {
  const {
    name: {
      name,
      first_name,
      last_name,
      email,
      password,
      password_confirmation
    }
  } = action
  const response = yield call(api.signup, {
    name,
    first_name,
    last_name,
    email,
    password,
    password_confirmation
  })

  if (response.ok) {
    const { token, user } = response.data
    yield AsyncStorage.setItem(TOKEN_KEY, token)
    yield AsyncStorage.setItem(USER_KEY, JSON.stringify(user))
    yield put(SignupActions.signupSuccess(token, user))
  } else {
    const message=response.data;
    const errors = get(response, 'errors', {})

    //console.log("response.data")
    //console.log(response.data)

   

    yield put(SignupActions.signupFailure(errors,message))
  }
}

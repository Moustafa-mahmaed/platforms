import { call, put } from 'redux-saga/effects'
import AsyncStorage from '@react-native-community/async-storage'
import Constants from '../../Services/Constants'

import PostTypes from '../../Redux/Actions/Post'

const { TOKEN_KEY } = Constants

export function * getPost (api, action) {
  const { category, id } = action

  const token = yield AsyncStorage.getItem(TOKEN_KEY)

  const response = yield call(
    api.post,
    { category, id },
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  )

  if (response.ok) {
    const { data } = response
    yield put(PostTypes.postSuccess(data))
  } else {
    yield put(PostTypes.postFailure())
  }
}

import { call, put } from 'redux-saga/effects'
import AsyncStorage from '@react-native-community/async-storage'
import Constants from '../../Services/Constants'

import CategoriesTypes from '../../Redux/Actions/Categories'

const { TOKEN_KEY } = Constants

export function * getCategory (api, action) {
  const { category, page, tag } = action

  const token = yield AsyncStorage.getItem(TOKEN_KEY)

  const response = yield call(
    api.categories,
    { category, page, tag },
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  )

  if (response.ok) {
    const { data } = response
    yield put(CategoriesTypes.categorySuccess(data))
  } else {
    yield put(CategoriesTypes.categoryFailure())
  }
}

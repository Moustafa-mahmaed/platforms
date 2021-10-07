import { call, put } from 'redux-saga/effects'
import AsyncStorage from '@react-native-community/async-storage'
import Constants from '../../Services/Constants'

import FeaturedTypes from '../../Redux/Actions/CategoriesFeaturedItems'

const { TOKEN_KEY } = Constants

export function * getFeaturedItems (api, action) {
  const { category } = action

  const token = yield AsyncStorage.getItem(TOKEN_KEY)

  const response = yield call(
    api.categoriesFeaturedItems,
    { category },
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  )

  if (response.ok) {
    const { data } = response
    yield put(FeaturedTypes.featuredSuccess(data))
  } else {
    yield put(FeaturedTypes.featuredFailure())
  }
}

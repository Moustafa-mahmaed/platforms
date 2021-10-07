import { call, put } from 'redux-saga/effects'
import AsyncStorage from '@react-native-community/async-storage'
import Constants from '../../Services/Constants'

import CountryTypes from '../../Redux/Actions/Post'

const { TOKEN_KEY } = Constants

export function * getCountry (api, action) {
 

  const token = yield AsyncStorage.getItem(TOKEN_KEY)

  const response = yield call(
    api.Country,
    
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  )
  //console.log(response)

  if (response.ok) {
    const { data } = response
    yield put(CountryTypes.CountrySuccess(data))
  } else {
    yield put(CountryTypes.CountryFailure())
  }
}

import { call, put } from 'redux-saga/effects'
import TagsActions from '../../Redux/Actions/Tags'
import AsyncStorage from '@react-native-community/async-storage'
import Constants from '../../Services/Constants'

const { TOKEN_KEY } = Constants

export function * getTags (api, action) {
  const { category } = action
  const token = yield AsyncStorage.getItem(TOKEN_KEY)

  // make the call to the api
  const response = yield call(
    api.tags,
    { category },
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  )

  if (response.ok) {
    const { tags } = response.data
    yield put(TagsActions.tagsSuccess(tags))
  } else {
    yield put(TagsActions.tagsFailure())
  }
}

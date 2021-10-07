// import { call, put } from 'redux-saga/effects'
// import get from 'lodash/get'
// import CommentTypes from '../../Redux/Actions/comment'
// import Constants from '../../Services/Constants'
// import AsyncStorage from '@react-native-community/async-storage'

// const { TOKEN_KEY, USER_KEY } = Constants

// export function * postcomment (api, action) {
//   const {
//     name: {
//       body
//     }
//   } = action
//   const response = yield call(api.comment, {
//  body
//   })

//   if (response.ok) {
//     const { data } = response.data
//     // yield AsyncStorage.setItem(TOKEN_KEY, token)
//     // yield AsyncStorage.setItem(USER_KEY, JSON.stringify(user))
//     yield put(CommentTypes.commnentSuccess(data))
//   } else {
//     const errors = get(response, 'errors', {})
//     yield put(CommentTypes.commnentFailure(errors))
//   }
// }

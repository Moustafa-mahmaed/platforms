import { call, put } from 'redux-saga/effects'
import get from 'lodash/get'
import FormActions from '../../Redux/Actions/Form';
import AsyncStorage from '@react-native-community/async-storage'
import Constants from '../../Services/Constants'
const { TOKEN_KEY } = Constants


export function * getform (api, action) {
  const {
  
      title,
      body,
      tags,
      
    
  } = action
  const token = yield AsyncStorage.getItem(TOKEN_KEY)
  const response = yield call(api.Forms, {
  title,
  body,
  tags
  },
  {
     headers: { Authorization: `Bearer jmLMfCBmebuYN5NEa335v2XQMMObYkbHYLejRbLZQJXn9lOjWrXaJISUxOn3`}
            //  Accept: 'application/json', 
  })
  // //////////////////////////
      //console.log(response)
///////////////////////////////////
  if (response.ok) {
    const {  data } = response.data
   
    yield put(FormActions.FormSuccess(data))
  } else {
    const errors = get(response, 'errors', {})
    yield put(FormActions.FormFailure(errors))
  }
}


import { call, put } from 'redux-saga/effects'
import get from 'lodash/get'
import LoginActions from '../../../Redux/Actions/Auth/Login'
import Constants from '../../../Services/Constants'
import AsyncStorage from '@react-native-community/async-storage'

const { TOKEN_KEY, USER_KEY } = Constants

export function * login (api, action) {
  //console.log(action.object)
  if(action.object.provider !== undefined){
    const {object } = action
  // //////edit//
  const response = yield call(api.loginwithsocial, { "provider":object.provider,"user":{"id":object.user.id,
  "name":object.user.name,
  "email":object.user.email,
  "avatar" : "https://e3.365dm.com/19/08/768x432/skynews-premier-league-football_4740175.jpg"
  }})

//console.log("^^^^^^^^^^^^^^^^^^^^^^^^")
console.log(response)
//console.log("^^^^^^^^^^^^^^^^^^^^^^^^")

  if (response.ok) {
   

    const { token, user ,profile  } = response.data
    yield AsyncStorage.setItem(TOKEN_KEY, token)
    yield AsyncStorage.setItem(USER_KEY, JSON.stringify(user))
    yield AsyncStorage.setItem("SOCILA_MEDIA", "WITH_SOCIAL")
   

    yield put(LoginActions.loginSuccess(token, user,profile ))
  } else {
    const {message}=response.data;
    const errors = get(response, 'errors', {message:"error"})

     //console.log(response.data)
     ////console.log(errors)
    
    yield put(LoginActions.loginFailure(errors ,message ))
  }


  }
  else if(action.object.email !==undefined  && action.object.password !==undefined ){

  const { email, password } = action.object
  const response = yield call(api.login, { email, password })

  if (response.ok) {
   


    const { token, user ,profile  } = response.data
    yield AsyncStorage.setItem(TOKEN_KEY, token)
    yield AsyncStorage.setItem(USER_KEY, JSON.stringify(user))
   

    yield put(LoginActions.loginSuccess(token, user,profile ))
  } else {
    const {message}=response.data;
    const errors = get(response, 'errors', {message:"error"})

     //console.log(response.data)
     ////console.log(errors)
    
    yield put(LoginActions.loginFailure(errors ,message ))
  }
  }
  else{

  }
}

export function * checkToken () {
  const token = yield AsyncStorage.getItem(TOKEN_KEY)
  const userJson = yield AsyncStorage.getItem(USER_KEY)
  const user = JSON.parse(userJson)

  if (token) {
    yield put(LoginActions.loginSuccess(token, user))
    console.log("LoginActions.loginSuccess :true")
  } else {
    yield put(LoginActions.loginFailure())
  }
}

export function * logout () {
  yield AsyncStorage.removeItem(TOKEN_KEY)
  yield AsyncStorage.removeItem(USER_KEY)
  try{
    yield AsyncStorage.removeItem("profilecheck")
    yield AsyncStorage.removeItem("SOCILA_MEDIA")
  

  }catch{

  }
}

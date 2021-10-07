import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  // loginRequest: ['email', 'password'],
  loginRequest: ['object'],
  loginSuccess: ['token', 'user',"profile"],
  loginFailure: ['errors',"message"],
  checkToken: null,
  logout: null
})

export const LoginTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  token: null,
  user: null,
  profile:false,
  fetching: null,
  errors: null,
  message:null
})

/* ------------- Selectors ------------- */

// export const LoginSelectors = {
//   selectAvatar: state => state.auth.token
// }

/* ------------- Reducers ------------- */

// request token and user
// export const request = (state, { email, password }) =>
//   state.merge({ fetching: true, email, password })




export const request = (state, { object }) =>
  state.merge({ fetching: true, object })



// successful token and user lookup
export const success = (state, action) => {
  const { token, user,profile} = action
  return state.merge({ fetching: false, errors: null, token, user ,profile })
}

// failed to get the token and user
export const failure = (state ,action) =>{
  
  if(action.message ==null){
    return state.merge({ fetching: false, errors: true, profile:null,token: null, user: null ,message:"" })

  }else{
    const { message} = action
   return state.merge({ fetching: false, errors: true, profile:null,token: null, user: null ,message })


  }
  

}

export const checkToken = state => state.merge({ fetching: true })

export const logout = state => state.merge({ token: null, user: null })

export const reset = () => INITIAL_STATE

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_REQUEST]: request,
  [Types.LOGIN_SUCCESS]: success,
  [Types.LOGIN_FAILURE]: failure,
  [Types.CHECK_TOKEN]: checkToken,
  [Types.LOGOUT]: logout
})

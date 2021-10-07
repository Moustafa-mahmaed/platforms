import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  signupRequest: [
    'name',
    'first_name',
    'last_name',
    'email',
    'password',
    'password_confirmation'
  ],
  signupSuccess: ['token', 'user'],
  signupFailure: ['errors','message']
})

export const SignupTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  token: null,
  user: null,
  fetching: null,
  errors: null,
  message:null
})

/* ------------- Reducers ------------- */

// request token and user
export const request = (
  state,
  { name, first_name, last_name, email, password, password_confirmation }
) =>
  state.merge({
    fetching: true,
    name,
    first_name,
    last_name,
    email,
    password,
    password_confirmation
  })

// successful token and user lookup
export const success = (state, action) => {
  const { token, user } = action
  return state.merge({ fetching: false, errors: null, token, user })
}

// failed to get the token and user
export const failure =  (state, action) =>{
if(action.message ==null){


  return  state.merge({ fetching: false, errors: true, token: null, user: null ,message:""})
}else{

  const { message } = action

  return  state.merge({ fetching: false, errors: true, token: null, user: null ,message })
}

  
}

export const reset = () => INITIAL_STATE

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SIGNUP_REQUEST]: request,
  [Types.SIGNUP_SUCCESS]: success,
  [Types.SIGNUP_FAILURE]: failure
})

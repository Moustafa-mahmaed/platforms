import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  
  FormRequest: [
    "title",
    "options0",
    "options1",
    "options2"
   
  ],
  FormSuccess: [ 'data'],
  FormFailure: ['errors']
})

export const PullFormTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  
  data: null,
  fetching: null,
  errors: null
})


/* ------------- Reducers ------------- */

// request token and user
export const request = (
 
  state,
  {   title,
    options0,
    options1,
    options2 }
) =>
  state.merge({
    fetching: true,
    title,
    options0,
    options1,
    options2
    
  })
 
// successful token and user lookup
export const success = (state, action) => {
  

  const {  data } = action
  return state.merge({ fetching: false, errors: null,  data })
}

// failed to get the token and user
export const failure = state =>
  state.merge({ fetching: false, errors: true,  data: null })

export const reset = () => INITIAL_STATE

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.FORM_REQUEST]: request,
  [Types.FORM_SUCCESS]: success,
  [Types.FORM_FAILURE]: failure
})

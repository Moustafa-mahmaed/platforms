import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  postRequest: ['category', 'id'],
  postSuccess: ['data'],
  postFailure: ['errors']
})

export const PostTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  errors: null
})

/* ------------- Reducers ------------- */

// request the data
export const request = (state, { category, id }) =>
  state.merge({ fetching: true, category, id })

// successful data lookup
export const success = (state, action) => {
  const { data } = action
  return state.merge({ fetching: false, errors: null, data })
}

// failed to get the data
export const failure = state =>
  state.merge({ fetching: false, errors: true, data: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.POST_REQUEST]: request,
  [Types.POST_SUCCESS]: success,
  [Types.POST_FAILURE]: failure
})

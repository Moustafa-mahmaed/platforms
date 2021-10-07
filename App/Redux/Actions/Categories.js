import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  categoryRequest: ['category', 'page', 'tag'],
  categorySuccess: ['data'],
  categoryFailure: ['errors']
})

export const CategoriesTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  list: null,
  fetching: null,
  errors: null
})

/* ------------- Reducers ------------- */

// request the data for a category
export const request = (state, { category, page, tag }) =>
  state.merge({ fetching: true, category, page, tag })

// successful data lookup
export const success = (state, action) => {
  const { data } = action
  return state.merge({ fetching: false, errors: null, data, list: data.data })
}

// failed to get the data
export const failure = state =>
  state.merge({ fetching: false, errors: true, data: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CATEGORY_REQUEST]: request,
  [Types.CATEGORY_SUCCESS]: success,
  [Types.CATEGORY_FAILURE]: failure
})

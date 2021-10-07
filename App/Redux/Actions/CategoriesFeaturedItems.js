import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  featuredRequest: ['category'],
  featuredSuccess: ['data'],
  featuredFailure: ['errors']
})

export const FeaturedTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  category: null,
  featuredList: null,
  fetching: null,
  errors: null
})

/* ------------- Reducers ------------- */

// request the data
export const request = (state, { category }) =>
  state.merge({ fetching: true, category })

// successful data lookup
export const success = (state, action) => {
  const { data } = action
  return state.merge({ fetching: false, errors: null, featuredList: data.data })
}

// failed to get the data
export const failure = state =>
  state.merge({ fetching: false, errors: true, featuredList: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.FEATURED_REQUEST]: request,
  [Types.FEATURED_SUCCESS]: success,
  [Types.FEATURED_FAILURE]: failure
})

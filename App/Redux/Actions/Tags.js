import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  tagsRequest: ['category'],
  tagsSuccess: ['tags'],
  tagsFailure: ['errors']
})

export const TagsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  category: null,
  tags: null,
  fetching: null,
  error: null
})

/* ------------- Selectors ------------- */

export const TagsSelectors = {
  selectTags: state => state.tags.tags
}

/* ------------- Reducers ------------- */

// request
export const request = (state, { category }) =>
  state.merge({ fetching: true, category, tags: null })

// success
export const success = (state, action) => {
  const { tags } = action
  return state.merge({ fetching: false, error: null, tags })
}

// failed
export const failure = state =>
  state.merge({ fetching: false, error: true, tags: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.TAGS_REQUEST]: request,
  [Types.TAGS_SUCCESS]: success,
  [Types.TAGS_FAILURE]: failure
})

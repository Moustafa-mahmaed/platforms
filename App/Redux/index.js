import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import rootSaga from '../Redux/Sagas'

/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
  login: require('./Actions/Auth/Login').reducer,
  signup: require('./Actions/Auth/Signup').reducer,
  category: require('./Actions/Categories').reducer,
  categoriesFeaturedItems: require('./Actions/CategoriesFeaturedItems').reducer,
  post: require('./Actions/Post').reducer,
  tags: require('./Actions/Tags').reducer,
  Form: require("./Actions/Form").reducer,
  pollform: require("./Actions/pollform").reducer
, Country: require('./Actions/country').reducer,


})

export default () => {
  return configureStore(reducers, rootSaga)
}

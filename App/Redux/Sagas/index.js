import { takeLatest, all } from 'redux-saga/effects'
import API from '../../Services/Api'
import FixtureAPI from '../../Services/FixtureApi'
import DebugConfig from '../../Config/DebugConfig'

/* ------------- Types ------------- */

import { StartupTypes } from '../../Redux/Actions/Startup'
import { LoginTypes } from '../../Redux/Actions/Auth/Login'
import { SignupTypes } from '../../Redux/Actions/Auth/Signup'
import { CategoriesTypes } from '../../Redux/Actions/Categories'
import { FeaturedTypes } from '../../Redux/Actions/CategoriesFeaturedItems'
import { PostTypes } from '../../Redux/Actions/Post'
import { CountryTypes } from '../../Redux/Actions/country'
import { TagsTypes } from '../../Redux/Actions/Tags'
import { PullFormTypes } from '../../Redux/Actions/pollform'
// import { CommentTypes } from '../../Redux/Actions/comment'


 
/* ------------- Sagas ------------- */

import { startup } from './Startup'
 import { login, checkToken, logout } from './Auth/Login'
import { signup } from './Auth/Signup'
import { getCategory } from './Categories'
import { getFeaturedItems } from './CategoriesFeaturedItems'
import { getPost } from './Post'
import { getTags } from './Tags'
import { getform } from './Form'
import {getpullform} from './pollform'
import { getCountry } from './country'
// import {postcomment} from './comment'





/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    takeLatest(StartupTypes.STARTUP, startup),

    // Auth
    takeLatest(LoginTypes.LOGIN_REQUEST, login, api),
    takeLatest(LoginTypes.CHECK_TOKEN, checkToken),
    takeLatest(LoginTypes.LOGOUT, logout),

    
    takeLatest(SignupTypes.SIGNUP_REQUEST, signup, api),

    // Categories
    takeLatest(CategoriesTypes.CATEGORY_REQUEST, getCategory, api),

    // Post
    takeLatest(PostTypes.POST_REQUEST, getPost, api),
    //country
    takeLatest(CountryTypes.COUNTRY_REQUEST, getCountry, api),

    // Featured List
    takeLatest(FeaturedTypes.FEATURED_REQUEST, getFeaturedItems, api),

    // Tags
    takeLatest(TagsTypes.TAGS_REQUEST, getTags, api),

    //Form)
    
    // takeLatest(FormTypes.FORM_REQUEST, getform, api),

       //pullForm)
    
       takeLatest(PullFormTypes.FORM_REQUEST, getpullform, api),
         //postcommentForm)
    
        //  takeLatest(CommentTypes.FORM_REQUEST, postcomment, api),


         

     
  ])
}

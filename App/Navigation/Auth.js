import { createStackNavigator } from 'react-navigation'

import Login from '../Containers/Auth/Login'
import SignUp from '../Containers/Auth/SignUp'
import ForgetPassword from '../Containers/Auth/ForgetPassword'

const AuthStack = createStackNavigator(
  {
    LoginScreen: {
      screen: Login
    },
    SignUpScreen: {
      screen: SignUp
    },
    ForgetPasswordScreen: {
      screen: ForgetPassword
    }
    
  },

  {
    headerMode: 'none',
    initialRouteName: 'LoginScreen'
    
  }
)

export default AuthStack

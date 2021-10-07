import { createAppContainer, createSwitchNavigator } from 'react-navigation'

import AuthLoading from '../Containers/AuthLoading'
import AuthStack from './Auth'
import AppStack from './App'

const Switcher = createSwitchNavigator(
  {
    Loading: AuthLoading,
    Auth: AuthStack,
    App: AppStack
  },
  {
    initialRouteName: 'Loading'
  }
)

export default createAppContainer(Switcher)

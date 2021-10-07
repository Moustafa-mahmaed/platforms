import React from 'react'
import { ActivityIndicator, View } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import LoginActions from '../../Redux/Actions/Auth/Login'
import { put } from 'redux-saga/effects'
import Constants from '../../Services/Constants'
import styles from './styles'

const { TOKEN_KEY } = Constants

class AuthLoading extends React.Component {
  constructor (props) {
    super(props)
    this._bootstrapAsync()
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    await put(LoginActions.checkToken())

    const userToken = await AsyncStorage.getItem(TOKEN_KEY)
    const loggedIn = !!userToken

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(loggedIn ? 'App' : 'Auth')
  }

  // Render any loading content that you like here
  render () {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    )
  }
}
export default AuthLoading

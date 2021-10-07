import React, { Component } from 'react'
import { object } from 'prop-types'
import { connect } from 'react-redux'
import LoginActions from '../../../../Redux/Actions/Auth/Login'

import { Text, View } from 'react-native'

import styles from './styles'

class SettingsScreen extends Component {
  logout = () => {
    this.props.logout()
    this.props.navigation.navigate('Auth')
  }
  render () {
    return (
      <View style={styles.root}>
        <Text onPress={this.logout}>Logout 🔥</Text>
      </View>
    )
  }
}

SettingsScreen.propTypes = {
  navigation: object
}

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(LoginActions.logout())
})

export default connect(
  null,
  mapDispatchToProps
)(SettingsScreen)

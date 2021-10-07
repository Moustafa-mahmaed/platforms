import React, { Component } from 'react'
import { View, StatusBar } from 'react-native'
import { connect } from 'react-redux'
import StartupActions from '../../Redux/Actions/Startup'
import ReduxPersist from '../../Config/ReduxPersist'
import AppNavigation from '../../Navigation/Navigation'

 
import NavigationService from '../NavigationService'
// Styles
import styles from './styles'

class RootContainer extends Component {
  componentDidMount () {
    // if redux persist is not active fire startup action
    if (!ReduxPersist.active) {
      this.props.startup()
    }
  }

  render () {
    return (
      <View style={styles.applicationView}>
        <StatusBar barStyle='dark-content' />
         <AppNavigation  ref={navigatorRef => {
           console.log('9999999999999999955555555555')
          NavigationService.setTopLevelNavigator(navigatorRef);
        }} /> 
      </View>
    )
  }
}

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = dispatch => ({
  startup: () => dispatch(StartupActions.startup())
})

export default connect(
  null,
  mapDispatchToProps
)(RootContainer)

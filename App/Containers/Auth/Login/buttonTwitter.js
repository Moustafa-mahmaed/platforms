import React, { Component } from "react"
import { connect } from 'react-redux'

import {
  AppRegistry,
  // Button,
  StyleSheet,
  Text,
  View,
  Alert,
  NativeModules,
  TouchableOpacity } from "react-native"
  import styles from './styles'
  import Button from '../../../Components/Controls/Button'
  import { Colors } from '../../../Theme/'
 import LoginActions from '../../../Redux/Actions/Auth/Login'


const { RNTwitterSignIn } = NativeModules

const Constants = {
  //Dev Parse keys
  TWITTER_COMSUMER_KEY: "MsU0K2fhAmlgfBInR2GrEHGNI",
  TWITTER_CONSUMER_SECRET: "ZUqJQgyNEONN6zwXzdD6l2RXIGO96AOyJOoUsrLoTgbwWVvdp4"
}

 class TwitterButton extends Component {
  state = {
    isLoggedIn: false
  }

  _twitterSignIn = () => {
    RNTwitterSignIn.init(Constants.TWITTER_COMSUMER_KEY, Constants.TWITTER_CONSUMER_SECRET)
    RNTwitterSignIn.logIn()
      .then(loginData => {
        console.log(loginData)
        var object={
          
	"provider":"twitter",
	"user" : {
		"id" : loginData.userID,
		"name" : loginData.name,
		"email" :loginData.email ,
		"avatar" :"https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwiug7ra-svmAhVkA2MBHRIbDcUQjRx6BAgBEAQ&url=https%3A%2F%2Fwuzzuf.net%2Fjobs%2Fcareers%2Ftrendleez-Egypt-36575&psig=AOvVaw2Haw4p0U4zkNLhwljT9Q9_&ust=1577196966957276"
	} 

        }
        console.log("twitter api")
        console.log(object)
         this.props.login(object )
        const { authToken, authTokenSecret } = loginData
        if (authToken && authTokenSecret) {
          this.setState({
            isLoggedIn: true
          })
        }
      })
      .catch(error => {
        //console.log(error)
      }
    )
  }

  handleLogout = () => {
    //console.log("logout")
    RNTwitterSignIn.logOut()
    this.setState({
      isLoggedIn: false
    })
  }

  render() {
    const { isLoggedIn } = this.state
    return (
      <Button
                  type='secondary'
                  buttonColor={Colors.twitter}
                  icon={require('../../../Images/Icons/twitter.png')}
                  style={styles.iconLeft}
                  onPress={this._twitterSignIn}
                /> 
      // <View style={this.props.style}>
      //   {isLoggedIn
      //     ? <TouchableOpacity onPress={this.handleLogout}>
      //         <Text>Log out</Text>
      //       </TouchableOpacity>
      //     : <Button name="logo-twitter" style={styles.button} onPress={this._twitterSignIn} title="Login with Twitter">
      //       </Button>}
      // </View>
    )
  }
}

// const styles = StyleSheet.create({
//   button: {
//     backgroundColor: '#1b95e0',
//     color: 'white',
//     width: 200,
//     height: 50
//   }
// })

const mapStateToProps = (state, ownProps) => {
 
  return {
    token: state.login.token,

    fetching: state.login.fetching,
    errors: state.login.errors,
    message: state.login.message

  }
}


const mapDispatchToProps = dispatch => ({
  login: (object) =>
    dispatch(LoginActions.loginRequest(object))
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TwitterButton)

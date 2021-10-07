

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NativeModules,
} from 'react-native';
import PushNotification from "react-native-push-notification";
import TwitterButton from './TwitterButton';

export default class Example extends Component {
   componentDidMount(){
        
           PushNotification.configure({
            // (optional) Called when Token is generated (iOS and Android)
            onRegister: function(token) {
             console.log("TOKEN:", token);
            },
          
            // (required) Called when a remote or local notification is opened or received
            onNotification: function(notification) {
            console.log("NOTIFICATION:");
            console.log("NOTIFICATION:", notification);
          
              // process the notification here
          
              // required on iOS only 
              // notification.finish(PushNotificationIOS.FetchResult.NoData);
            },
            // Android only
            senderID: "867665517582",
            // iOS only
            permissions: {
              alert: true,
              badge: true,
              sound: true
            },
            popInitialNotification: true,
            requestPermissions: true
          });
    }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <TwitterButton style={styles.button} />
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  button: {
    height: 50,
  },
  icon: {
    width: 100,
    height: 30
  }
});
import React, { Component } from 'react'
import { object } from 'prop-types'

import { Text, View, ScrollView, StatusBar ,TouchableWithoutFeedback,Alert} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import TextInput from '../../../../Components/Controls/TextInput'
import PrimaryList from '../../../../Components/PrimaryList'

import { connect } from 'react-redux'
import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'react-native-firebase';

import I18n from '../../../../I18n/I18n'

import { Colors } from '../../../../Theme'
import styles from './styles'
let token;

class HomeScreen extends Component {
  state = {
    searchText: ''
  }
  // componentDidMount(){
    // PushNotification.configure({
    //     // (optional) Called when Token is generated (iOS and Android)
    //     onRegister: function(fcm_token) {
    //       //console.log("fcm_token:", fcm_token);
    //       //console.log("token:", token);
    //       //POST: 
    //       fetch('https://forums.influancy.com/api/fcm/token', {
    //         method: 'POST',
    //         headers: {
    //           'Accept': 'application/json',
    //           'Content-Type': 'application/json',
    //           "Authorization": `Bearer ${token}`, 
    //         },
    //         body:JSON.stringify( {'token':fcm_token.token }),
    //           }).then(res => res.json()).then(res => {               
    //             // Alert.alert('', JSON.stringify(res),[{text: 'موافق', style: 'cancel'},],{ cancelable: false })
    //           }).catch(error => {
    //             // alert(error)
    //           });

    //     },
      
    //     // (required) Called when a remote or local notification is opened or received
    //     onNotification: function(notification) {
    //       // alert("NOTIFICATION:", notification);
      
    //       // process the notification here
      
    //       // required on iOS only 
    //       // notification.finish(PushNotificationIOS.FetchResult.NoData);
    //     },
    //     // Android only
    //     senderID: "867665517582",
    //     // iOS only
    //     permissions: {
    //       alert: true,
    //       badge: true,
    //       sound: true 
    //     },
    //     popInitialNotification: true,
    //     requestPermissions: true
    //   });
// }
async componentDidMount() {
  this.checkPermission();
  this.createNotificationListeners(); //add this line

}
componentWillUnmount() {
  // this.notificationListener();
  // this.notificationOpenedListener();
}
  //1
async checkPermission() {
  const enabled = await firebase.messaging().hasPermission();
  if (enabled) {
      this.getToken();
  } else {
      this.requestPermission();
  }
}

  //3
async getToken() {
  console.log("getToken-----------------------")
  let fcmToken = await AsyncStorage.getItem('fcmToken');
  if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
          // user has a device token
          await AsyncStorage.setItem('fcmToken', fcmToken);
           
      }
  }
  console.log("fcmToken")
  console.log("fcmToken",fcmToken)
  fetch('https://forums.influancy.com/api/fcm/token', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`, 
    },
    body:JSON.stringify( {'token':fcmToken }),
      }).then(res => res.json()).then(res => {               
        // Alert.alert('', JSON.stringify(res),[{text: 'موافق', style: 'cancel'},],{ cancelable: false })
      }).catch(error => {
        // alert(error)
      });

}

  //2
async requestPermission() {
  try {
      await firebase.messaging().requestPermission();
      // User has authorised
      this.getToken();
  } catch (error) {
      // User has rejected permissions
      console.log('permission rejected');
  }
}



async createNotificationListeners() {
  /*
  * Triggered when a particular notification has been received in foreground
  * */
  // this.notificationListener = firebase.notifications().onNotification((notification) => {
  //     const { title, body } = notification;
  //     this.showAlert(title, body);
  // });

  /*
  * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
  * */
  this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
      const { title, body } = notificationOpen.notification;
      this.showAlert(title, body);
  });

  /*
  * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
  * */
  const notificationOpen = await firebase.notifications().getInitialNotification();
  if (notificationOpen) {
      const { title, body } = notificationOpen.notification;
      this.showAlert(title, body);
  }
  /*
  * Triggered for data only payload in foreground
  * */
  this.messageListener = firebase.messaging().onMessage((message) => {
    //process data message
    console.log(JSON.stringify(message));
  });
}

showAlert(title, body) {
  Alert.alert(
    title, body,
    [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
    ],
    { cancelable: false },
  );
}


  navigate = route => {
    this.props.navigation.navigate(route)
  }

  renderGradient = () => (
    <LinearGradient
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 1 }}
      colors={[Colors.cerulean, Colors.shockingPink]}
      style={styles.gradientHeader}
    />
  )

  renderHeader = () => {
    const { fetching } = this.props

    return (
      <View style={styles.header}>
        <Text style={styles.title}>{I18n.t('homeTitle')}</Text>



        <Text style={styles.subTitle}>{I18n.t('homeSubtitle')}</Text>
      

        <TextInput
          style={styles.searchBox}
          onChangeText={
              searchText => {
                this.setState({ searchText })
              }
              
            }
            onFocus={
              ()=>this.props.navigation.navigate('Search')
            }
            value={this.state.searchText}
            placeholder={I18n.t('search')}
            editable={!fetching}
            />

        
      </View>
    )
  }

  renderBody = () => {
    
    return (
      <View style={styles.body}>
        {/* FIXME: ask of they need this title */}
        {/* <Text style={styles.bodyTitle}>{I18n.t('homeTitle')}</Text> */}
        <PrimaryList onItemPress={this.navigate} />
      </View>
    )
  }

  render () {

    return (
      <ScrollView style={styles.root}>
        <StatusBar barStyle='light-content' />

        <View style={styles.content}>
          {this.renderGradient()}
          {this.renderHeader()}
          {this.renderBody()}
        </View>
      </ScrollView>
    )
  }
}

HomeScreen.propTypes = {
  navigation: object
}

const mapStateToProps = state => {
  
  token=state.login.token;
  return {
    data: state.category.data,
    list: state.category.list,
  
  }
}

const mapDispatchToProps = dispatch => ({
  getCategory: (category, page) =>
    dispatch(CategoriesActions.categoryRequest(category, page))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen)



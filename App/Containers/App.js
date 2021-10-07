import {
  I18nManager,
  TouchableOpacity
} from 'react-native'
import '../Config'


import DebugConfig from '../Config/DebugConfig'
import React, {
  Component
} from 'react'
import {
  Provider
} from 'react-redux'
import RootContainer from './RootContainer'
import createStore from '../Redux'
import moment from 'moment'
import AsyncStorage from '@react-native-community/async-storage';
import SplashScreen from 'react-native-splash-screen'
import PushNotification from "react-native-push-notification";


import Constants from './../Services/Constants'
const {
  TOKEN_KEY,
  USER_KEY
} = Constants
require('moment/locale/ar.js')

moment.locale('ar')
let realtoken;
// create our store
const store = createStore()

/**
 * Provides an entry point into our application.  Both index.ios.js and index.android.js
 * call this component first.
 *
 * We create our Redux store here, put it into a provider and then bring in our
 * RootContainer.
 *
 * We separate like this to play nice with React Native's hot reloading.
 */


import NavigationService from './NavigationService';


class App extends Component {
  constructor(props) {
    super(props)
    I18nManager.forceRTL(false)
    this.handleNotification = this.handleNotification.bind(this);
  }

  handleNotification(notification)
	{
		console.log('handleNotification');
		var notificationId = ''
		//your logic to get relevant information from the notification
		
    //here you navigate to a scene in your app based on the notification info
		this.navigator.push({ id: Constants.ITEM_VIEW_ID, item: item });
	}
  _handleNotificationOpen = () => {

  }

  onCardPress = (route, item) => {

    this.props.navigation.navigate(route, {
      category: 'questions',
      item
    })
  }
  componentDidMount() {
    AsyncStorage.getItem(TOKEN_KEY).then((value) => {

      if (value !== null) {
        realtoken = value

        console.log("realtoken" + realtoken);

      }
    });



    SplashScreen.hide();
    PushNotification.configure({



      onRegister: function (token) {

        var object = {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${realtoken}`

          },
          body: JSON.stringify({
            token: token.token
          })
        };

        console.log(object);

        const SendTokenApi = `https://forums.influancy.com/api/fcm/token`

        fetch(SendTokenApi, object)
          .then((response) => {

            console.log(response);
            if (response.ok) {
              console.log("ok");
            }
            response.text()
          }).then((responseData) => {})
          .catch(function (err) {

          });






      },


      // (required) Called when a remote or local notification is opened or received
      onNotification: function (notification) {
        // console.log("NOTIFICATION:", notification);
        console.log("NOTIFICATION====>:", notification);


        NavigationService.navigate('PostNotification' , 
        {
         item: notification
      
          
    }      
 )
    

        //      const {push } = this.props.navigation

        
        //  push ('PostNotification',  {data:
        //    item.data
        //   }
        //     )
        //               ()=>  this.onCardPress('PostNotification', 
        //            
        //        )





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
    return ( <
      Provider store = {
        store
      } >
      < RootContainer / >

      </Provider>
    )
  }
}

// allow reactotron overlay for fast design in dev mode
export default (DebugConfig.useReactotron ? console.tron.overlay(App) : App)

  import React from 'react'
  import { Platform } from 'react-native'

  import {
    createBottomTabNavigator,
    createStackNavigator

  } from 'react-navigation'


  import Login from '../Containers/Auth/Login'

  // =============== Tabs Screens ===============
  import Settings from '../Containers/App/Tabs/Settings'
  import Profile from '../Containers/App/Tabs/Profile'
  import EditProfile from "../Containers/App/Tabs/Profile/editprofile"
  import Home from '../Containers/App/Tabs/Home'
  import Chat from '../Containers/App/Tabs/Chat'
  import Notifications from '../Containers/App/Tabs/Notifications'
  

  // ====================message navigate view=========================
  import Chatclient from '../Containers/App/Tabs/Chat/pusher_conf/ChatClient'
 

  // ============ Categories Screens ============
  import MainHall from '../Containers/App/Categories/MainHall'
  import Cooperations from '../Containers/App/Categories/Cooperations'
  import Questions from '../Containers/App/Categories/Questions'
  import Competitions from '../Containers/App/Categories/Competitions'
  import Workshop from '../Containers/App/Categories/Workshop'
  import Events from '../Containers/App/Categories/Events'
  import Polls from '../Containers/App/Categories/Polls'
  import Post from '../Containers/App/Post'
  import Details from '../Containers/App/Details'
  import PostNotification from '../Containers/App/PostNotification'
  import DetailsNotification from '../Containers/App/DetailsNotification'
  
  import StoreItem from '../Containers/App/storeItem'
  
  
  
  
  
  import Market from '../Containers/App/Categories/Market'
  // =================forms========================
  
  import Search from '../Containers/App/searchform'
  import Soon from '../Containers/App/soon'
  import Report from '../Containers/App/Report'
  
  import OpinionBeforeVoting from "../Containers/App/forms/OpinionBeforeVoting";
  import OpinionAfterVoting from "../Containers/App/forms/OpinionAfterVoting";
  
  

  // =================== ADD FORM=====================
  import AddNewDiscussion from "../Containers/App/forms/MainHall/AddNewDiscussion";
  import AddNewProject from "../Containers/App/forms/Cooperations/AddNewProject";
  import Addnewquestion from "../Containers/App/forms/Question/Addnewquestion"
  import AddProduct from "../Containers/App/forms/AddProduct";
  import OpinionAdd from "../Containers/App/forms/Polls/OpinionAdd";
  import AddWorkShop from "../Containers/App/forms/Workshop/addworkshop";
  import AddEvent from "../Containers/App/forms/Event/AddEvent";
  import Guest from '../Containers/App/Tabs/Profile/geust'
  import CompleteProfile from '../Containers/App/Tabs/Profile/completeprofile'


  // =================== Edit FORM=====================
  import Editquestion from "../Containers/App/forms/Question/Editnewquestion"
  import EditWorkShop from "../Containers/App/forms/Workshop/Editworkshop";
   import EditNewDiscussion from "../Containers/App/forms/MainHall/EditNewDiscussion";
   import EditNewProject from "../Containers/App/forms/Cooperations/EditNewProject";
  // import AddProduct from "../Containers/App/forms/AddProduct";
  // import OpinionEdit from "../Containers/App/forms/Polls/OpinionEdit";
   import EditEvent from "../Containers/App/forms/Event/EditEvent";








  import Icon from 'react-native-vector-icons/Ionicons'
  import { Colors } from '../Theme'

  const IS_IOS = Platform.OS === 'ios'
  let iconType = IS_IOS ? 'ios' : 'md'



  // add Guest screen
  const Guest1=createStackNavigator({
    Guest:{screen :Guest},

  },
  {headerMode:"none"})


  ///search 
  const Search1=createStackNavigator({
    Search:{screen :Search},

  },
  {headerMode:"none"})

 ///soon 
  const Soon1=createStackNavigator({
    Soon:{screen :Soon},

  },
  {headerMode:"none"})

//report

const Report1=createStackNavigator({
  Report:{screen :Report},

},
{headerMode:"none"})


  // add Event screen
  const AddEvent1=createStackNavigator({
    OpinionAdd:{screen :AddEvent},

  },
  {headerMode:"none"})

  // Edit Event screen

  const EditEvent1=createStackNavigator({
    OpinionAdd:{screen :EditEvent},

  },
  {headerMode:"none"})

  // add workshop screen
  const AddWorkShop1=createStackNavigator({
    OpinionAdd:{screen :AddWorkShop},

  },
  {headerMode:"none"})


  // add opinion screen
  const OpinionAdd1=createStackNavigator({
    OpinionAdd:{screen :OpinionAdd},

  },
  {headerMode:"none"})


  // add new project screen
  const AddNewProject1=createStackNavigator({
    AddNewProject:{screen :AddNewProject},

  },
  {headerMode:"none"})

//chatview 
const Chatclient1=createStackNavigator({
  Chatclient:{screen :Chatclient},

})


  // add new discussion screen
  const AddNewDiscussion1=createStackNavigator({
    AddNewDiscussion:{screen :AddNewDiscussion},

  },
  {headerMode:"none"})

  // add new question screen 
  const AddQuestion1=createStackNavigator({
    Addnewquestion:{screen :Addnewquestion},

  },
  {headerMode:"none"})

  //edit profile screen
  const EditProfile1 = createStackNavigator({
    EditProfile : {
      screen: EditProfile,
    },
  }
  ,{ headerMode: 'none' })



  //CompleteProfile screen
  const CompleteProfile1 = createStackNavigator({
    EditProfile : {
      screen: CompleteProfile  ,
    },
  }
  ,{ headerMode: 'none' })





  // ////////////////edit form////////////////////////
  // edit  question screen 
  const EditQuestion1=createStackNavigator({
    Editquestion:{screen :Editquestion},

  },
  {headerMode:"none"})


  // edit  WORKSHOP screen 

  const EditWorkShop1=createStackNavigator({
    EditWorkShop:{screen :EditWorkShop},

  },
  {headerMode:"none"})

  // edit discussion screen


   const EditNewDiscussion1=createStackNavigator({
     EditNewDiscussion:{screen :EditNewDiscussion},

   },
   {headerMode:"none"})

  // Edit project screen

  const EditNewProject1=createStackNavigator({
    EditNewProject:{screen :EditNewProject},

  },
  {headerMode:"none"})


  // const EditNewProject1=createStackNavigator({
  //   EditNewProject:{screen :EditNewProject},

  // },
  // {headerMode:"none"})




  const BottomTabNavigator = createBottomTabNavigator(
    {
      Home: createStackNavigator({
        Home: { screen: Home },
        MainHall: { screen: MainHall },
        Cooperations: { screen: Cooperations },
        Questions: { screen: Questions },
        Competitions: { screen: Competitions },
        Workshop: { screen: Workshop },
        Events: { screen: Events },
        Polls: { screen: Polls },
        Post: { screen: Post },
        PostNotification: { screen: PostNotification },
        Details:{screen:Details},
        DetailsNotification:{screen:DetailsNotification},
        Market:{screen:Market},
        StoreItem:{screen:StoreItem},
        // AddNewDiscussion:{screen:AddNewDiscussion },
        AddNewProject:{screen:AddNewProject},
        // Addnewquestion:{screen:Addnewquestion},
        AddProduct:{screen:AddProduct},
        // CompleteProfile:{screen:CompleteProfile},
        // OpinionAdd:{screen:OpinionAdd}
        OpinionBeforeVoting :{screen:OpinionBeforeVoting},
        OpinionAfterVoting :{screen:OpinionAfterVoting},
      
        

      },

      { headerMode: 'none', initialRouteName: 'Home' }
    ),
        // Settings: { screen: Settings },
      Profile: createStackNavigator(
        {
        profile:{ screen: Profile},
        // EditProfile:{screen:EditProfile,
        //    }
        }
        ,
        { headerMode: 'none', initialRouteName: 'profile'  }

      ),
    
      
       Chat: createStackNavigator({
         Chat:{ screen: Chat, 
          navigationOptions:{
         header:null
          }},
        //  Chatclient:{screen :Chatclient}
        }//,{ headerMode: 'none' }
      ),
       Notifications: { screen: Notifications }
    },
    {
      initialRouteName: 'Home',
      defaultNavigationOptions: ({ navigation }) => ({
        
      tabBarOptions: {
        showLabel: false,

        
        
        // activeTintColor: Colors.basic.white,
        activeTintColor: '#d51189',
       // activeBackgroundColor: Colors.shockingPink,
        inactiveBackgroundColor: Colors.basic.white,
        // inactiveTintColor: Colors.basic.black,
        style: {},
        labelStyle: {},
        tabStyle: {}
      },
      headerMode: 'none',
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state
        let iconName
        switch (routeName) {
          case 'Settings':
            iconName = `${iconType}-settings`
            break

            
          case 'Home':
            iconName = `${iconType}-home`
            break

          case 'Profile':
            iconName = `${iconType}-contact`
            break


          case 'Chat':
            iconName = `${iconType}-chatboxes`
            break

          case 'Notifications':
            iconName = `${iconType}-notifications`
            break

          default:
            iconName = `${iconType}-home`
            break
        }

        return <Icon name={iconName} size={25} color={tintColor} />
      }
    })
  }
  )

  const AppStack = createStackNavigator(
  {
    HomeTabs: {
      screen: BottomTabNavigator,
      navigationOptions: {
        header:null,
        tabBarVisible: false,
      }
    },
    EditProfile:{screen:EditProfile1,
      navigationOptions: {
        header:null,
        tabBarVisible: false,
      }}
      ,AddQuestion1:{
        screen:AddQuestion1,
        navigationOptions: {
          header:null,
          tabBarVisible: false,
        }
      }
      ,AddNewDiscussion:{
        screen:AddNewDiscussion1,
        navigationOptions: {
          header:null,
          tabBarVisible: false,
        }
      }
      ,Chatclient:{screen :Chatclient},
      // Chatclient:{
      //   screen:Chatclient1,
      //   navigationOptions: {
      //     // tabBarVisible: false,
      //   }
      // },
     
     
      
      AddNewProject:{
        screen:AddNewProject1,
        navigationOptions:{
          header:null,
          tabBarVisible:false
        }
      },

      EditNewDiscussion:{
        screen:EditNewDiscussion1,
        navigationOptions: {
          header:null,
          tabBarVisible: false,
        }
      },
      EditNewProject:{
        screen: EditNewProject1,
        navigationOptions: {
          header:null,
          tabBarVisible: false,
        }
      },
     

      // EditNewProject:{
      //   screen:EditNewProject1,
      //   navigationOptions:{
      //     tabBarVisible:false
      //   }
      // },
      EditQuestion:{
        screen:EditQuestion1,
        navigationOptions: {
          header:null,
          tabBarVisible: false,
        }
      }
      ,
      EditWorkShop:{
        screen:EditWorkShop1,
        navigationOptions: {
          header:null,
          tabBarVisible: false,
        }
      }
      ,
      
    
      CompleteProfile:{
        screen:CompleteProfile1,
        navigationOptions:{
          header:null,
          tabBarVisible:false
        }
      },
      Guest:{
        screen:Guest1,
        navigationOptions:{
          header:null,
          tabBarVisible:false
        }
      },
      OpinionAdd:{
        screen:OpinionAdd1,
        navigationOptions:{
          header:null,
          tabBarVisible:false
        }
      },
        AddWorkShop:{
          screen:AddWorkShop1,
          navigationOptions:{
          header:null,
          tabBarVisible:false
          },

        },
        AddEvent:{
          screen:AddEvent1,
          navigationOptions:{
          header:null,
          tabBarVisible:false
          },

        }
        ,Report:{
          screen:Report1,
          navigationOptions: {
          header:null,
          tabBarVisible: false,
          }
        },
        Search:{
          screen:Search1,
          navigationOptions:{
          header:null,
          tabBarVisible:false
          }
      },
       Soon:{
          screen:Soon1,
          navigationOptions:{
          header:null,
          tabBarVisible:false
          }
      },
        EditEvent:{
          screen:EditEvent1,
          navigationOptions:{
          header:null,
          tabBarVisible:false
          },
          

        }
      

      
  },
  // {
  //   headerMode: 'none',
  
  // }
  )
  export default AppStack

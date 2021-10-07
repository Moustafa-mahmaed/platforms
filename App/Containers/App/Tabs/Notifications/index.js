import React, { Component } from 'react'
import { object } from 'prop-types'
import { connect } from 'react-redux'

import LinearGradient from 'react-native-linear-gradient'
import AsyncStorage from '@react-native-community/async-storage';
import { Text, View, ScrollView ,Image,ActivityIndicator } from 'react-native'
import CompleteProfile from '../../../../Containers/App/Tabs/Profile/completeprofile'
import I18n from '../../../../I18n/I18n'
import CardsListnotification from "../../../../Components/CardsListnotification"
import styles from './styles'
import { Colors } from '../../../../Theme'
let token;
let profilecheck;

import Constants from '../../../../Services/Constants'
const { TOKEN_KEY, USER_KEY } = Constants
let flagopen =false;
let key2;
class NotificationsScreen extends Component {
constructor(props){
super(props)
this.state={
  loading:false,
  list:[],
   waiter:true
}
}


  componentDidMount(){
  
// check
 AsyncStorage.getItem(TOKEN_KEY).then((value) => {

             if (value !== null) {
               token=value
                 console.log( value);
             }
         });
     
      fetch(`https://forums.influancy.com/api/profiles/${userid}`,{  headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
      }})
          .then((response) => response.json())
          .then((responseJson) => {
          
           
        
         
         if(responseJson.error =="Complete your profile"){
               

                //async
                try {
                  AsyncStorage.setItem('profilecheck', "false");
                  this.setState({

                   waiter:false
                  })
           
                  } catch (error) {
                   
                  }
             

            }
             else if(responseJson.message=="Unauthenticated."){
                
                 fetch(`https://forums.influancy.com/api/profiles/${userid}`,{  headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
      }})
          .then((response) => response.json())
          .then((responseJson) => {
          
            console.log(responseJson)
             if(responseJson.error =="Complete your profile"){
               

                //async
                try {
                  AsyncStorage.setItem('profilecheck', "false");
                  this.setState({

                   waiter:false
                  })
           
                  } catch (error) {
                   
                  }
             

            }else{
               try {
               AsyncStorage.removeItem("profilecheck")
                  } catch (error) {
                    
                  }

            }
          })
             }
           
            else{

               console.log( "error mess :"+ JSON.stringify(responseJson))

            
                //async
          try {
               AsyncStorage.removeItem("profilecheck")
                  } catch (error) {
                    
                  }
             
            
            }
          })
          .catch((error) =>{ 
        
          });
          AsyncStorage.getItem('profilecheck').then((key1) => {

             if (key1 !== null) {
               key2=key1
                 console.log( key2);
             }
         });

flagopen=true





    
  const api_notification ="https://forums.influancy.com/api/notifications";
 
  
  var object = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`
      
    },
};
 
  fetch(api_notification, object)
  .then((response) =>
    response.json())
    .then((responseJson) => {
     //console.log(responseJson)
      this.setState({
        list:responseJson.notifications,
        loading:true,
         waiter:false
      })

    })

  .catch(function(err) {});



}



renderGradient = () => (
  <LinearGradient
    start={{ x: 1, y: 0 }}
    end={{ x: 0, y: 1 }}
    colors={[Colors.rouge, Colors.brick]}
    style={styles.gradientHeader}
  />
)

  renderList = () => {
    const { loading,  list } = this.state

    return (
      
       <View style={styles.body}>
         {!loading && ( 
           <ActivityIndicator
           size='small'
           color={Colors.deepSkyBlue}
           style={styles.fetching}
           />
           )}
       
       
        {
         
          loading && list !== undefined  ?
          
         
          <CardsListnotification
          data={list}
           colorlogo={Colors.dustyOrange}
          
           onItemPress={this.onCardPress}
          //  handleLoadMore={this.handleLoadMore}
          //  loadingMore={loadingMore}
           />
       
        // <Text> {JSON.stringify(list)}</Text>
     
         :
         <View style={{flex:1, padding: 10, marginTop:20}}>
        <Text style={{fontSize:25 , textAlign :"center"}}>لا توجد اشعارات</Text>
         </View>
         } 
         
       

       
      </View>
    )
  }
  onCardPress = (route, item) => {

   this.props.navigation.navigate(route, {category: 'questions', item})
  }
  renderHeader = () => {
  

  return (
    <View style={styles.header}>
      <Text style={styles.title}>{I18n.t('notification')}</Text>
</View>
)}
  renderGradient = () => (
    <LinearGradient
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 1 }}
      colors={[Colors.rouge, Colors.brick]}
      style={styles.gradientHeader}
    />
  )
  render () {
    return (
      <ScrollView style={styles.root}>
      {this.state.waiter ?
        <ActivityIndicator
          size='small'
          color={Colors.jungleGreen}
          style={styles.fetching}
          />
          
           :
           null
     }
       
       {key2 !== "false" && this.state.waiter==false ?
       
        <View style={styles.content}>
           {this.renderGradient()}

          {this.renderHeader()}

        {this.renderList()}
           
        </View>
       :
       null
       }
      {  key2 == "false" && this.state.waiter==false ?
       
        <View>
         <CompleteProfile/>
         </View>
        :
        null

         }
       
       
      </ScrollView>
     
    )
  }
}

NotificationsScreen.propTypes = {
  navigation: object
}


const mapStateToProps = (state, ownProps) => {

  token=state.login.token;
   userid=state.login.user.id


  
  
    return {
    
      fetching: state.signup.fetching,
      errors: state.signup.errors
    }
  }

const mapDispatchToProps = dispatch => ({
 
  signup: (
    title,
   

    
    
  ) =>
    dispatch(
      SignupActions.FormRequest(title,options0,options1,options2)
    )
})

NotificationsScreen.defaultProps = {
  signup: () => {},

  fetching: false,
  errors: false
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationsScreen)

import React, { Component } from 'react'
import { object } from 'prop-types'
import { connect } from 'react-redux'
import I18n from '../../../../I18n/I18n'

import { Colors } from '../../../../Theme'
import LinearGradient from 'react-native-linear-gradient'
import CompleteProfile from '../../../../Containers/App/Tabs/Profile/completeprofile'
import Constants from '../../../../Services/Constants'
const { TOKEN_KEY, USER_KEY } = Constants
let token;
let id;
import { Text,ActivityIndicator, View, ScrollView } from 'react-native'
import CardsListmessage from '../../../../Components/CardsListmessage'
import AsyncStorage from '@react-native-community/async-storage';
import styles from './styles'
let key2;
let flagopen=false

class ChatScreen extends Component {
  constructor(props){
    super(props)
this.state={
  list:[],
  waiter:true,
  
}
  }
 componentDidMount(){
    
   const uri_api="https://forums.influancy.com/api/conversations";

   var object = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`
    }
   
};

fetch(uri_api, object)
.then((response) =>
response.json())
.then((responseJson) => {
this.setState({list:responseJson.data
, waiter:false,

},function(){

  console.log("_____________________")
  console.log(this.state.list.length)
  
  console.log(this.state.list)


 
})
})
.catch(function(err) {
  
        alert("حدث خطأ ! الرجاء التواصل مع الدغم الفني.");
});


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

// flagopen=true

}


 onCardPress = (route, item) => {

  this.props.navigation.navigate("Chatclient",{token,userName:item.last_message.user.userName,id ,conversation_id:item.last_message.conversation_id} )
}


renderList = () => {
  const { list } = this.state

  return (
    <View style={styles.body}>
      {!list  && (
        <ActivityIndicator
          size='small'
          color={Colors.jungleGreen}
          style={styles.fetching}
        />
      )}
{   list.length >0 ?
      <CardsListmessage
      data={list}
      onItemPress={this.onCardPress}
      
      />
      :
      <Text style={{textAlign:"center" ,fontSize:18}}>لا يوجد رسائل</Text>

    }
    </View>
  )
}
renderHeader = () => {
  

  return (
    <View style={styles.header}>
      <Text style={styles.title}>{I18n.t('message')}</Text>
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
     
      {
      // edit
      key2 !== "false" && this.state.waiter==false  ?
        <View style={styles.content}>
           {this.renderGradient()}
           {this.renderHeader()}
           {this.renderList()}
          </View>
        :
        null

         }
          {
      // edit
      key2 == "false" && this.state.waiter==false ?
       
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

ChatScreen.propTypes = {
  navigation: object
}

const mapDispatchToProps = dispatch => ({})

const mapStateToProps = (state, ownProps) => {
  token=state.login.token,
  id=state.login.user.id
  userid=state.login.user.id
 

  
  
    return {
    
     
    }
  }
export default connect(
  mapStateToProps,
    mapDispatchToProps
)(ChatScreen)


  
 
  
 
 

  
  


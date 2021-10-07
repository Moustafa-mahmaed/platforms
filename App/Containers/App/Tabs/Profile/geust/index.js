import React, { Component } from 'react'
import { object } from 'prop-types'
import { connect } from 'react-redux'
import { Text, View, ScrollView,Image,Platform, Dimensions,ActivityIndicator, Switch} from 'react-native'
  import Entypo from 'react-native-vector-icons/Entypo';
  import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
  import FontAwesome5Icon from 'react-native-vector-icons/MaterialCommunityIcons';
  
  import moment from 'moment'
 
 import LinearGradient from 'react-native-linear-gradient'

let token;
 import Button from '../../../../../Components/Controls/Button'

import I18n from '../../../../../I18n/I18n'
import { Colors } from '../../../../../Theme'

 
import styles from './styles'

 
const IS_IOS = Platform.OS === 'ios'
let iconType = IS_IOS ? 'ios' : 'md'
 

class geustScreen extends Component {

state={
  profileInfo:[],
  loading:true,
  profilename:""
}
  renderTitle = () => (
    <View style={styles.titleContainer}>
      {this.renderBackButton()}
     
    </View>
  )
 
 
 checkmsgnew = () => {
  
   const uri_api2=`https://forums.influancy.com/api/conversations`;

   var object = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`
    }
   
};

fetch(uri_api2, object)
.then((response) =>

response.json())
.then((responseJson) => {
  console.log(this.props.navigation.state.params.userName);
  

    for (var i = 0; i < responseJson.data.length; i++) {
         
   console.log("DDDDDDDDDDDDDDDDDDDDDDDDDDD");
   console.log(this.state.profilename);
   console.log("DDDDDDDDDDDDDDDDDDDDDDDDDDD");
   
       if( responseJson.data[i].last_message.user.name ===  this.state.profilename ) {
        console.log("found userName");
    //      this.setState({
    // conversation_found:true

    //     });
        
    
 
       }else{
            console.log(" not found userName");
    //         this.setState({
    // conversation_found:false

    //     });
       }
     }

})
.catch(function(err) {
  
        alert("حدث خطأ ! .");
});


   
  };
  
componentDidMount(){
  this.checkmsgnew()
}



  componentWillMount(){
    
     fetch(`https://forums.influancy.com/api/profiles/${this.props.navigation.state.params.id}`,{  headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      // "Authorization": "Bearer jmLMfCBmebuYN5NEa335v2XQMMObYkbHYLejRbLZQJXn9lOjWrXaJISUxOn3"
        "Authorization": `Bearer ${token}`

    }})
         .then((response) => response.json())
         .then((responseJson) => {
            
            this.setState({
              loading:false,
              profileInfo:responseJson[0],
            },function(){
              this.setState({
                profilename:this.state.profileInfo.user.userName

              },function(){

                //console.log(this.state.profilename)
              })
             
   
              
            

            })
  
         })
         .catch((error) =>{
           console.error(error);
         });
  }
  renderBackButton = () => {
    return (
      <Button
        onPress={() => {
     
        
          this.props.navigation.pop()
        }}
        iconSettings={{
          iconName: `${iconType}-arrow-back`,
          iconSize: 25,
          iconTintColor: Colors.basic.white,
          iconStyle: styles.backButtonIcon
        }}
        type='transparent'
        buttonColor={Colors.rouge}
        containerStyle={
         
          styles.backButton
        }
      />
    )
  }

  renderPost = ()=>{
 const {
birthdate,
city,
country,
gender,
user,
tags
// user:{
//   //avatar,
//   fullName,
//   email
// }
 }=this.state.profileInfo
    
      
        return (
    <View>
      {
         this.state.loading?
          <ActivityIndicator
          size='small'
          color={Colors.jungleGreen}
          style={styles.fetching}
          /> :
       <View>   
    <View style={styles.content}>
    <View style={styles.gradientHeader}>

    </View>
        {this.renderGradient()}
        {this.renderTitle()}
      </View> 
      

      <View>
      <View style={styles.avatarContainer}>
     



        
   {this.state.profileInfo.user &&
      <Image 
      style={styles.avatar}
      source={{uri: user.avatar}}
      /> 
    }
            </View>
            {this.state.profileInfo.user &&
            <View style={styles.emailcontainer}>
        <Text style={styles.fullName}>{user.fullName}</Text>
          <Text style={styles.userName}>@{user.email} </Text>
            </View>
            }
            
         <View style={styles.btncontainerstyle}>
         <View style={styles.btnstyle}>

          <Button
                type='primary'
                onPress={()=>{

                  //console.log("$$$$$$$$$$$$$$$$$$$$$$")
                  //console.log(this.state.profilename)
                  
                  //console.log("$$$$$$$$$$$$$$$$$$$$$$")
                  
                 this.props.navigation.navigate("Chatclient",{token  ,userName:this.state.profilename} )
                }
                }
                title={I18n.t('sendMessage')}
                />
         </View>
         </View>
        
            </View>





            <View >
        
             <View style={styles.layoutcontainer}>
              
                    <View>
<FontAwesome5Icon  onPress={this.GoToEditProfile}  name="arrow-left-bold" size={18} color={Colors.basic.black} />
                 
                    </View>
                  <View>
                  <Text style={styles.countryName}> تاريخ الميلاد</Text>
              <Text style={styles.userCountery}>   
            
              {moment(birthdate).format('l')}
           
               </Text>

                    </View>

                 </View>


                 <View style={styles.layoutcontainer}>
              
                    <View>
<FontAwesome5Icon  onPress={this.GoToEditProfile}  name="arrow-left-bold" size={18} color={Colors.basic.black} />
                 
                    </View>
                  <View>
                  <Text  style={styles.countryName} > البلد/ المنطقة </Text>
            {this.state.profileInfo.city && this.state.profileInfo.country &&
               <Text style={styles.userCountery}>{country.name} -{city.name}</Text> 
            }

                    </View>

                 </View>


                 <View style={styles.layoutcontainer}>
              
              <View>
<FontAwesome5Icon  onPress={this.GoToEditProfile}  name="arrow-left-bold" size={18} color={Colors.basic.black} />
           
              </View>
            <View>
            <Text  style={styles.countryName} > الاهتمامات </Text>
            {this.state.profileInfo.tags && 
           tags.map(item => {
            return (

              <Text key={item.name} style={styles.userCountery}>{item.name}</Text> 
            )
            }
             ) }
            

            

           </View>
           </View>

             
  


          </View>

          <View style={styles.singlelayoutcontainer}>
          

          



   
    </View>
    </View>
  }
    </View>
    
    
    
  )
}

  renderGradient = () => (

     
    <LinearGradient
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 1 }}
      colors={[Colors.tomato,'#a8000b']}
      style={styles.gradientHeader}
      />
  
  )



  render () {

  
    
 
  
    return (

      <ScrollView style={styles.root}>
    

        {this.state.profileInfo &&  this.renderPost()}
      
      </ScrollView>
    )
  }
}






const mapStateToProps = (state, ownProps) => {

  token=state.login.token

  
  
    return {
    
      fetching: state.signup.fetching,
      errors: state.signup.errors
    }
  }

const mapDispatchToProps = dispatch => ({
  signup: (
    title,
    options0,
    options1,
    options2

    
    
  ) =>
    dispatch(
      SignupActions.FormRequest(title,options0,options1,options2)
    )
})



geustScreen.defaultProps = {
  signup: () => {},

  fetching: false,
  errors: false
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(geustScreen)



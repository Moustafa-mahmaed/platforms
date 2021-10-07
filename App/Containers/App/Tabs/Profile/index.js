import React, { Component } from 'react'
import { object } from 'prop-types'
import { connect } from 'react-redux'
import { Text, View, ScrollView,Image,Platform, Dimensions,ActivityIndicator, Switch} from 'react-native'
  import Entypo from 'react-native-vector-icons/Entypo';
  import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
  import FontAwesome5Icon from 'react-native-vector-icons/MaterialCommunityIcons';
  import Icon from 'react-native-vector-icons/FontAwesome5';
  import Icon5 from 'react-native-vector-icons/AntDesign';

  import LoginActions from '../../../../Redux/Actions/Auth/Login'
  import moment from 'moment'
 
 import LinearGradient from 'react-native-linear-gradient'
import CompleteProfile from '../../../../Containers/App/Tabs/Profile/completeprofile'
import Home from '../../../../Containers/App/Tabs/Home'

let token;
let userid;
 import Button from '../../../../Components/Controls/Button'

import I18n from '../../../../I18n/I18n'
import { Colors } from '../../../../Theme'

 
import styles from './styles'

 
const IS_IOS = Platform.OS === 'ios'
let iconType = IS_IOS ? 'ios' : 'md'
 let profilecheck;

class ProfileScreen extends Component {

state={
  profileInfo:[],
  loading:true,
  waiter:false
}
  renderTitle = () => (
    <View style={styles.titleContainer}>
    
     
    </View>
  )
 
  componentWillMount(){
    // //console.log(this.props.navigation.state.params.id)
     fetch(`https://forums.influancy.com/api/profiles/${userid}`,{  headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`

    }})
         .then((response) => response.json())
         .then((responseJson) => {
                    //  //console.log(responseJson)
      if(responseJson.length==2  ){  
      
        profilecheck=true
        //  //console.log("profilecheck"+profilecheck);
         this.setState({
          loading:false,
          waiter:true,
          profileInfo:responseJson[0]

         
        },function(){
         
          
          //console.log(this.state.profileInfo)
        

        })
         
       
       
       
      }else{
        profilecheck=false
        //console.log(profilecheck+"profilecheck");
        // this.props.navigation.navigate('CompleteProfile')
        this.setState({
          loading:true,
          waiter:true,
        },function(){
         
          
          //console.log(this.state.profileInfo)
        

        })

       // //console.log(profilecheck);

      }
  
          
  
         })
         .catch((error) =>{
           console.error(error);
         });
  }
  


  GoToEditProfile = () => {
    this.props.navigation.navigate('EditProfile',{profileInfo:this.state.profileInfo})
  }

  
  signout = () => {
     
    var object = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
         "Authorization": `Bearer ${token}`
        
      }

};
          


const logoutapi=`https://forums.influancy.com/api/logout`


fetch(logoutapi, object)
.then((response) =>{

  
  if(response.ok){
   
    console.log("ok");
    
   
  }
  
  response.text()
  
}
).then((responseData) => {})
.catch(function(err) {
 
});



    this.props.logout()
    this.props.navigation.navigate('Auth')
  }


  renderPost = ()=>{

    
 const {
birthdate,
city,
country,
gender,
user,
tags,
user_id,
 user:{
  userName
//   //avatar,
//   fullName,
//   email
 }
 }=this.state.profileInfo
    
      
        return (
    <View>
      {
         this.state.loading && profilecheck  && this.state.waiter?
        
        
       
          <ActivityIndicator
          size='small'
          color={Colors.jungleGreen}
          style={styles.fetching}
          />
          
           :
       <View>   
    <View style={styles.content}>
    <View style={styles.gradientHeader}>

    </View>
        {this.renderGradient()}
        {this.renderTitle()}
      </View> 
      

      <View>
      <View style={styles.avatarContainer}>
     



     
      <View style={styles.absoluteicon}>

<Icon   style={{padding:15}} onPress={this.GoToEditProfile}  name="edit" size={18} color={Colors.basic.black} />
{/* <Icon  onPress={this.GoCompleteProfile}  name="edit" size={18} color={Colors.basic.black} /> */}
</View>

        
   {this.state.profileInfo.user &&
      <Image 
      style={styles.avatar}
      source={{uri: user.avatar}}
      /> 
    }

<View style={styles.absoluteicon1}>

<Icon5  style={{padding:15}}  onPress={this.signout}  name="logout" size={22} color="red" />
{/* <Icon  onPress={this.GoCompleteProfile}  name="edit" size={18} color={Colors.basic.black} /> */}
</View>

            </View>
            {this.state.profileInfo.user &&
            <View style={styles.emailcontainer}>
        <Text style={styles.fullName}>{user.fullName}</Text>
          <Text style={styles.userName}>@{user.userName} </Text>
            </View>
            }
            
         <View style={styles.btncontainerstyle}>
         <View style={styles.btnstyle}>

          {/* <Button
                type='primary'
                // onPress={this.props.navigation.navigate("Chatclientcreate1",{token ,user_id} )}
                onPress={()=>this.props.navigation.navigate("Chatclientcreate",{token ,user_id ,userName} )}
                title={I18n.t('sendMessage')}
                /> */}
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

// redirect(){
//   this.timeoutHandle = setTimeout(()=>{
//     // Add your logic for the transition
// }, 5000);
// }

  render () {
   
    
   

    // //console.log(this.props.navigation.state.params)
  
    return (

      <ScrollView style={styles.root}>
    

    {this.state.profileInfo && profilecheck && this.state.waiter ?
     this.renderPost()
    :
    // <CompleteProfile/>
        <View   >
      {/* <ActivityIndicator
          size='small'
          color={Colors.jungleGreen}
          style={styles.fetching}
         
         /> */}
      
         </View>
      }
  {this.state.profileInfo && !profilecheck  && this.state.waiter ?
      <CompleteProfile/>
    
    :
    // 
        <View   >
         </View>
      }

      
      </ScrollView>
    )
  }
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
  logout: () => dispatch(LoginActions.logout()),
  signup: (
    title,
   

    
    
  ) =>
    dispatch(
      SignupActions.FormRequest(title,options0,options1,options2)
    )
})



ProfileScreen.defaultProps = {
  signup: () => {},

  fetching: false,
  errors: false
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileScreen)



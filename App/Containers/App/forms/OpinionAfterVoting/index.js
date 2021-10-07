import React, { Component } from 'react'
import { object } from 'prop-types'
import CommentList from "../../../../Components/CommentList"



import Icons from 'react-native-vector-icons/Ionicons'
import { View,StyleSheet,TouchableOpacity, Text ,Alert, Platform, Dimensions , Button as Btn, ListView,
    TextInput, TouchableWithoutFeedback, KeyboardAvoidingView , Keyboard, ScrollView,Image,
 } from 'react-native'
 let avatarowner;
 let categ="Poll"
 import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuProvider ,
  
} from 'react-native-popup-menu';
 import moment from 'moment'
 import PostActions from '../../../../Redux/Actions/Post'
 import Icon from "react-native-vector-icons/FontAwesome"
 import Iconx from "react-native-vector-icons/Entypo"
 import colors from './../../../../Theme/Colors';

let total=0,token,profileid ;
 
 import Ioicon from "react-native-vector-icons/Ionicons"
//  import Icon from "react-native-vector-icons/FontAwesome"

 import TextInput1 from '../../../../Components/Controls/TextInput'
 import Entypo from 'react-native-vector-icons/Entypo';
 import Ionicons from 'react-native-vector-icons/Ionicons';


import Message from '../../../../Components/Message'

import { Formik } from 'formik'

import { connect } from 'react-redux'
import LoginActions from '../../../../Redux/Actions/Auth/Login'
import Button from '../../../../Components/Controls/Button'
import LinearGradient from 'react-native-linear-gradient'

import I18n from '../../../../I18n/I18n'

import styles from './styles'
import { Colors } from '../../../../Theme/';


var {width} = Dimensions.get("window");
const IS_IOS = Platform.OS === 'ios'
let iconType = IS_IOS ? 'ios' : 'md'



class OpinionAfterVoting extends Component {

  constructor(props) {
    super(props);
    this.state = { text: "",
    showmsg:false,
    comment:"",
    list1:[],
  total:0,

  favicon:'',
  repliicon:'',
};
  
    }
  state={value:null}
   
  componentWillMount(){
   
    let val=this.props.navigation.state.params.responseJson

    {val.data.options.map(item => {
      total += item.votes_count
    
  })
  // //console.log("total"+total)

}
  }


    onSelectorClicked = (value) => {
      if(value == 1) {
        
          
          this.props.navigation.navigate(this.props.navigation.state.params.Edit,this.props.data)
         
      }
      else if(value == 2) {
        this.Alertmessage()
      } else if(value == 3) {
        // ADD REPORTS
       
        // call FUNCTION REPORTS
        this.Reportfuction()

      }
      
    }

deleteitem(){
  
  var object = {
    method: 'delete',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`
      
    }
  };
  
      
  fetch(`https://forums.influancy.com/api/polls/${this.props.navigation.state.params.responseJson.data.id}
  `,object)
  .then((response) =>{
    
    console.log("response:"+JSON.stringify(response))
    if(response.ok){
      
      
      this.props.navigation.navigate("Home");
      
      this.setState({
        visible1:true
      })
    }
    
    response.text()
    
  }
  )
  .then((responseData) => {})
  .catch(function(err) {});
}
  Alertmessage(){
    Alert.alert(
      'هل  انت متاكد من الحذف ؟',
      'حذف السوال',
      [
      
        {
          text: 'الغاء',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'نعم ', onPress: () => this.deleteitem()},
      ],
      {cancelable: false},
    );
  }
  Reportfuction=()=>{
      this.props.navigation.navigate('Report',{id :this.props.navigation.state.params.responseJson.data.id ,category:"polls",token:token})
    }
  
  renderHighlight() {
 
 
    return (

     
    <MenuOptions   style={{height:50,width:100 ,textAlign:"center",backgroundColor:'rgba(184,184,184, 0.8)',borderRadius:30,paddingHorizontal:5,paddingTop:2}}>

    <MenuOption value={3} text='إبلاغ عن إساءة' style={{textAlign:"center" ,paddingTop:10}} onSelect={value => this.onSelectorClicked(value)} />
  

  </MenuOptions>

    );
}
// ////////////////////////

renderHighlight1() {
 
 
  return (


  
    <MenuOptions  style={{height:50,width:100 ,textAlign:"center",backgroundColor:'rgba(184,184,184, 0.8)',borderRadius:30,paddingHorizontal:5,paddingTop:2}}>
      {/* <MenuOption value={1} text='تعديل' onSelect={value => this.onSelectorClicked(value)} /> */}
      <MenuOption value={2} text='حذف'  style={{textAlign:"center" ,paddingTop:10}}onSelect={value => this.onSelectorClicked(value)} />

    </MenuOptions>




  );
}


  renderBackButton = () => {
    return (
      <Button
        onPress={() => {
          // this.props.navigation.goBack()
          total=0
       
          this.props.navigation.navigate("Polls")
        
        }}
        iconSettings={{
          iconName: `${iconType}-arrow-back`,
          iconSize: 25,
          iconTintColor: Colors.basic.white,
          iconStyle: styles.backButtonIcon
        }}
        type='transparent'
        buttonColor={Colors.cerulean}
        containerStyle={styles.backButton}
      />
    )
  }


  
  componentDidMount(){


    categ="Poll"
    
  
    const api_replies ="https://forums.influancy.com/api/replies";
    let api_with_categries=`${api_replies}/${this.props.navigation.state.params.id1}/${categ}`



    
    var object = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
        
      },
  };
   
    fetch(api_with_categries, object)
    .then((response) =>
      response.json())
      .then((responseJson) => {
     

        this.setState({
          list1:responseJson.data.data,
          reload:true
        },function(){
          //console.log("11111111111111111111111111111111111111111")
          //console.log(this.state.list1)
        })
  
      })
  
    .catch(function(err) {});



    const cate ="https://forums.influancy.com/api";
  let api1_with_categries=`${cate}/polls/${this.props.navigation.state.params.id1}`

 

  
  var object = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`
      
    },
};
 
  fetch(api1_with_categries, object)  
  .then((response) =>
    response.json())
    .then((responseJson) => {
   this.setState({
    favicon:responseJson.data.favorites_count,
    repliicon:responseJson.data.replies_count
   })
  
  

for(let i=0 ;i< responseJson.data.favorites.length ;i++){
  if (responseJson.data.favorites[i].user_id === profileid) {
    this.setState({click:true})
     }
} 




    })

  .catch(function(err) {});

  
  
  }
  
  
  
  reloadcomment=()=>{
    
    
        categ="Poll"
    
  
    const api_replies ="https://forums.influancy.com/api/replies";
    let api_with_categries=`${api_replies}/${this.props.navigation.state.params.responseJson.data.id}/${categ}`
  
    var object = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
        
      },
     
  };
   
    fetch(api_with_categries, object)
    .then((response) =>
      response.json())
      .then((responseJson) => {
      
        console.log("refresh:" +responseJson)
       
        this.setState({
          list1:responseJson.data.data,
          reload:false
          
        })
  
      })
  
    .catch(function(err) {});
  
  
  }
 
  onCardPress = (route, item) => {

    this.props.navigation.navigate(route,  item )
    
   
  }

    renderGradient = () => (
        <LinearGradient
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 1 }}
          colors={[Colors.dustyOrange, Colors.dustyOrange]}
          style={styles.gradientHeader}
        />
      )
    
      renderTitle = () => (
        <View style={styles.titleContainer}>
          {this.renderBackButton()}
          <Text style={styles.title}>{I18n.t('vote')}</Text>
        </View>
      )
    
      

      renderForm = () => {
    

const{
  data:{
    title,
    options,
    replies_count,
    favorites_count
    ,user:{
      avatar,
      fullName
      
    }
  },
  replies

}=  this.props.navigation.state.params.responseJson


console.log("::::")
console.log(this.props.navigation.state.params.responseJson)
// data.user_id
console.log("::::")

        return (
        <View>  
        <View style={{paddingVertical:10}}>
         <View> 
          <View style={styles.imgcontaineravator}>
<View style={{flexDirection:"row-reverse" }}>

<Image style={styles.image } source={{ uri:avatar  }} />
<View style={styles.titleContainer  ,{marginTop:5}}>
  
  <Text numberOfLines={1} style={styles.subTitle ,{color:"black"}}>
    {`${I18n.t('postedBy')} ${fullName}`}
    
  </Text>
  <Text style={styles.date}>
     {moment("2017/12/4", 'YYYYMMDD').fromNow()}
  </Text>
</View>
</View>

{/* <View style={{alignItems:"center" ,justifyContent:"center" }}>
<Iconx style={styles.icon} name="dots-three-horizontal" size={25} color="gray" />
</View> */}
<View>
{ this.props.navigation.state.params.responseJson !==null && this.props.navigation.state.params.responseJson.data.user_id ==profileid?
<View >

<TouchableWithoutFeedback onPress={()=>{
  

  this.setState({
    showmsg:!this.state.showmsg
  })            
}
}>

<Icon style={styles.icon} name="ellipsis-h" size={25} color="black" />
</TouchableWithoutFeedback>
 <MenuProvider style={{ height:90}}>

 { this.state.showmsg && this.renderHighlight1()}
 </MenuProvider>

</View>
// /////////////////////
        :
        <View >

<TouchableWithoutFeedback onPress={()=>{
  

  this.setState({
    showmsg:!this.state.showmsg
  })            
}
}>

<Icon style={styles.icon} name="ellipsis-h" size={25} color="black" />
</TouchableWithoutFeedback>
 <MenuProvider style={{  height:90}}>

 { this.state.showmsg && this.renderHighlight()}
 </MenuProvider>

</View>
 
}
</View>
</View>

          </View>
   <Text style={{fontSize:26,fontWeight:"bold",color:'black', marginHorizontal:15,marginVertical:15}}>{title}</Text>

   <View >
{options.map(item => {
  // total=total+item.votes_count

  return (
    <View key={item.id} style={styles.buttonContainer }>
            
 
<View>
  
</View>

          <Text style={{borderRadius:3, color:'black', marginHorizontal:15,fontSize:18,backgroundColor:"#c4c2c2" ,textAlign:"left",}}>
          { Math.floor((item.votes_count   /total)*100)}%
          <Text style={{marginRight: 50,marginHorizontal:15, marginRight:15,width:`${(((item.votes_count /total))*100   )+10}%` }} >    {item.body}</Text>
          </Text>
          {/* <Text>       </Text> */}
        </View>
    )
  })
}   
</View>
      
        
         <View  style={styles.iconNav} >
         {/*  */}
        
        <View style={styles.iconwithnumber}>
        
            <Icons style={styles.icon1} name={`${iconType}-chatbubbles`} size={25} color="gray" />
          
            <Text  style={styles.icon} >
            {this.state.repliicon}
            </Text>
     </View>
          
                 <View  style={styles.iconwithnumber}>

                        <TouchableWithoutFeedback onPress={()=>{
   
                        var object = {
                                  method: 'POST',
                                  headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json',
                                    "Authorization": `Bearer ${token}`
                                    
                                  },
                                  body:JSON.stringify( {
                                  type:'Poll',
                        id:this.props.navigation.state.params.id1,

                     
                            })

                          };
                          
                          const apilike=`https://forums.influancy.com//api/favorites`
                        fetch(apilike, object)
                        .then((response) =>{

                          if(response.ok){
                        
                            this.setState({
                              
                              click:!this.state.click

                            }) 
                            if(this.state.click ===true){
                              this.setState({
                                favicon:this.state.favicon +1
                              },function(){
                                
                              })
                            }
                            else{
                            this.setState({
                              favicon:this.state.favicon -1
                            },function(){
                              
                            })

                            }
                          }
                          
                          response.text()
                          
                        }
                        )
                        .then((responseData) => {})
                        .catch(function(err) {});



                       
                              // this.setState({click:!this.state.click})
                            
                        }}>

                          
                        <Icon style={styles.icon1} name={this.state.click?"heart":"heart-o" } size={25} color={this.state.click?"#ED4956":"gray" } />
                        </TouchableWithoutFeedback>
                        <Text  style={styles.icon} >
                        {/* {favorites_count} */}
                        {this.state.favicon}
                        </Text>
                        </View>
            </View>
            </View>


        <View style={styles.commentwithavator}>
        

        <Ioicon 
         style={[{ transform: [{ rotate: "180deg"},{translateY:50 }] },styles.inputstyle]}
         name="md-send" size={25} color="#900" 
         onPress={()=>{
           
         
       var object = {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
                
              },
              body:JSON.stringify( {
                type:'Poll',
                
         body:this.state.comment,
    
    id:this.props.navigation.state.params.responseJson.data.id,
    
    
   })
 };

 const api_replies ="https://forums.influancy.com/api/replies";
     
     fetch(api_replies, object)
     .then((response) =>{
     
       
       if(response.ok){

         this.setState({

           comment:"",
           repliicon:this.state.repliicon +1
           

         },function(){
          //console.log(this.state.repliicon)
         }) 
         this.reloadcomment()
    
       }
       
       response.text()
       
     }
     )
     .then((responseData) => {})
     .catch(function(err) {});
 }
    }
     
                  
       />
       <TextInput   
                placeholder='اضافة تعليق'
                autoGrow={true}
                
                dataDetectorTypes='all'
                enablesReturnKeyAutomatically={true}
                style={styles.writeComment,{borderRadius:20,borderWidth:1,borderColor:"grey" ,width:"70%" ,height:50}}
                onChangeText={comment =>
                  this.setState({ comment })
                }
                ref={input => {
                  this.textInput = input;
                }}
                
                value={this.state.comment}
                
                />
    
        <Image style={styles.avatar } source={{ uri: avatarowner }} />
          

        </View>

        <ScrollView style={styles.commentCollection}>
         
          <View style={styles.body}>
      
          {this.state.list1 == 0 && (
            <Text style={{paddingHorizontal:3,
              paddingVertical:5 ,fontSize:22 ,textAlign:"center"}}>لا تعليق</Text>
               )} 
              

        {this.state.list1.length > 0 && (
            <CommentList
            data={this.state.list1}
            onItemPress={this.onCardPress}
            
            />
            
            )} 
        
      </View>
          </ScrollView>
      
        

</View> 
 


   
         
        )
      }






      
  render () {
    


    return (
      <View style={styles.root}>
            <View style={styles.root}>
       {this.renderGradient()}
        {this.renderTitle()}

      <ScrollView>  
        {this.renderForm()}

        
      </ScrollView>
      

      </View>

       
      </View>
    )
  }
}

OpinionAfterVoting.propTypes = {
  navigation: object
}

const mapStateToProps = (state, ownProps) => {
  token=state.login.token
  profileid=state.login.user.id
    avatarowner=state.login.user.avatar

  

      return {
        data: state.post.data,
        fetching: state.post.fetching,
        errors: state.post.errors
      }
    }
  
  const mapDispatchToProps = dispatch => ({
    getPost: (category, id) => dispatch(PostActions.postRequest(category, id))
  })

    
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(OpinionAfterVoting)
    
 
  



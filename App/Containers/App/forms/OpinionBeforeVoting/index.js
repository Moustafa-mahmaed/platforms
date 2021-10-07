import React, { Component } from 'react'
import { object } from 'prop-types'
import CommentList from "../../../../Components/CommentList"

import { View,ActivityIndicator,StyleSheet,TouchableOpacity,Alert, Text , Platform, Dimensions , Button as Btn, ListView,
    TextInput, TouchableWithoutFeedback, KeyboardAvoidingView , Keyboard, ScrollView,Image,
 } from 'react-native'
  let avatarowner;
 import Icons from 'react-native-vector-icons/Ionicons'
 import moment from 'moment'
 import PostActions from '../../../../Redux/Actions/Post'
import Icon from "react-native-vector-icons/FontAwesome"
 
 import Ioicon from "react-native-vector-icons/Ionicons"
//  import Icon from "react-native-vector-icons/FontAwesome"
  import AntDesign from "react-native-vector-icons/AntDesign"
 let categ="Poll"
 import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuProvider ,
  
} from 'react-native-popup-menu';

 import TextInput1 from '../../../../Components/Controls/TextInput'
 import Entypo from 'react-native-vector-icons/Entypo';
 import Ionicons from 'react-native-vector-icons/Ionicons';

 import colors from './../../../../Theme/Colors';
import Message from '../../../../Components/Message'

import { Formik } from 'formik'

import { connect } from 'react-redux'
import LoginActions from '../../../../Redux/Actions/Auth/Login'
import Button from '../../../../Components/Controls/Button'
import LinearGradient from 'react-native-linear-gradient'

import I18n from '../../../../I18n/I18n'



import styles from './styles'
import { Colors } from '../../../../Theme/';
let token,postowner,profileid;
var {width} = Dimensions.get("window");
const IS_IOS = Platform.OS === 'ios'
let iconType = IS_IOS ? 'ios' : 'md'



class OpinionBeforeVoting extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      text: "",
      showmsg:false,
    loading: true,
    flag:false,
    list: [],
    list1: [],
    reload:false,
    comment:"" ,

    favicon:"",
    repliicon:""
  };
    }
  state={
    value:null
  
  }
  componentDidUpdate (prevProps) {
    if (
      this.state.list &&
     
      this.props.list !== prevProps.list
    ) {
      this.setState({
        list: [...this.state.list],
        loading: false,
        
      })
    }

  
  }

  onCardPress = (route, item) => {

    this.props.navigation.navigate(route,  item )
   
  }

  componentDidMount(){
        categ="Poll"
    const api_replies ="https://forums.influancy.com/api/replies";
    let api_with_categries=`${api_replies}/${this.props.navigation.state.params.item.id}/${categ}`
    
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
        })
     

  
      })
  
    .catch(function(err) {});





    const cate ="https://forums.influancy.com/api";
  let api1_with_categries=`${cate}/polls/${this.props.navigation.state.params.item.id}`

  //console.log(":::::::::::::::::::::::::::::::::::::")
  //console.log(api1_with_categries)
  //console.log(":::::::::::::::::::::::::::::::::::::")
  
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
      //console.log("================"+JSON.stringify(responseJson.data))
   this.setState({
    favicon:responseJson.data.favorites_count,
    repliicon:responseJson.data.replies_count
   },function(){
     //console.log(this.state.favicon+this.state.repliicon)
   })
  

for(let i=0 ;i< responseJson.data.favorites.length ;i++){
  if (responseJson.data.favorites[i].user_id === profileid) {
    this.setState({click:true})
     }
} 




    })

  .catch(function(err) {});

  
  
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
  
      
  fetch(`https://forums.influancy.com/api/polls/${this.props.navigation.state.params.item.id}
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
      this.props.navigation.navigate('Report',{id :this.props.navigation.state.params.item.id ,category:"polls",token:token})
    }
  
  renderHighlight() {
 
 
    return (

     
    <MenuOptions   style={{fontWeight: 'bold', fontSize:16, color:'red',position:"absolute", borderRadius:20, borderColor:'gray', borderWidth:0.5, backgroundColor:'rgba(205,205,205, 0.8)', paddingHorizontal:10,paddingVertical:4}}>

    <MenuOption value={3} text='إبلاغ عن إساءة' onSelect={value => this.onSelectorClicked(value)} />
  

  </MenuOptions>

    );
}
// ////////////////////////

renderHighlight1() {
 
 
  return (


  
    <MenuOptions  style={{position:"absolute" ,backgroundColor:'rgba(184,184,184, 0.8)',paddingHorizontal:10,paddingVertical:4,  fontFamily:'frutiger-lt-arabic-65-bold'}}>
      {/* <MenuOption value={1} text='تعديل' onSelect={value => this.onSelectorClicked(value)} /> */}
      <MenuOption value={2} text='حذف' onSelect={value => this.onSelectorClicked(value)} />

    </MenuOptions>




  );
}


  reloadcomment=()=>{
    
    
        categ="Poll"
    
  
    const api_replies ="https://forums.influancy.com/api/replies";
    let api_with_categries=`${api_replies}/${this.props.navigation.state.params.item.id}/${categ}`
  
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
      
        //console.log("refresh:" +responseJson)
       
        this.setState({
          list1:responseJson.data.data,
          reload:false
          
        })
  
      })
  
    .catch(function(err) {});
  
  
  }
  
  componentWillMount(){
    const url=`https://forums.influancy.com/api/polls/${this.props.navigation.state.params.item.id}`
    fetch(url ,{  headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`

    }})
    .then((response) => response.json())
    .then((responseJson) => {
      // //console.log(responseJson)
     

      for(let i=0 ; i< responseJson.data.options.length ;i++){
        for(let j=0 ; j< responseJson.data.options[i].votes.length ;j++){
         
          if( responseJson.data.options[i].votes[j].user_id ==profileid ){
            this.setState({
              list:responseJson,
              loading:true,
              flag:true
           
           }, function(){
           
            
      
            });
            this.props.navigation.navigate("OpinionAfterVoting", { responseJson ,id1:this.props.navigation.state.params.item.id  })
    }else{
  
    
    }
  
    
    }
    

  }


if(this.state.flag==false){

  this.setState({
    list:responseJson,
    loading:false
    
  }, function(){
    
  });
}

    })
    .catch((error) =>{
    });



// =========================================

const cate ="https://forums.influancy.com/api";
let api1_with_categries=`${cate}/${this.props.navigation.state.params.category}/${this.props.navigation.state.params.item.id}`
//console.log(api1_with_categries)

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


//==========================================



    
  }
  renderBackButton = () => {
    return (
      <Button
        onPress={() => {
          this.props.navigation.goBack(null) 
        
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
        const {
           loading, list } = this.state
// const {
//     title,
//     options:{
 
//     },
//     user:{
//         avatar,
//         fullName,
//         created_at
//     }
// } =
        // const { title } = this.props.navigation.state.params.item
        return (
   <View>  
          

           { loading ?
           <View>

            <ActivityIndicator
            size='small'
            color={Colors.jungleGreen}
            style={styles.fetching}
            />
            </View>
           : 
        <View>

           
        <View style={{paddingVertical:10,marginHorizontal:25 }}>
          <Text style={{fontSize:26,fontWeight:"bold" ,color:colors.basic.black, marginVertical:15}}>
          {list.data.title}
          </Text>
          <View>
{ this.props.navigation.state.params.item !==null && this.props.navigation.state.params.item.user_id ==profileid?
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

   <View style={{paddingHorizontal:8}}>
{list.data.options.map(item => {
  return (
    <View key={item.id} style={styles.buttonContainer}>
            
            <TouchableOpacity
    style={styles.circle}
    onPress={() => {
      this.setState({ value: item.id },function(){
        
        // //console.log(this.state.value)
      })
    } 
  }
  >
    { this.state.value === item.id && (<View style={styles.checkedCircle} />) } 
</TouchableOpacity>
  <Text style={styles.choices} >{item.body}</Text>
        </View>
    )
  })
}   
</View>
        <View style={{width:150}}>
          
        <Button
      onPress={() => {
        const voteapi = `https://forums.influancy.com/api/polls/${this.state.list.data.id}/vote`;

 
        var object = {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
            
          },
          body:JSON.stringify( {
           
     
            option:this.state.value
     
     
    })
  };
  
    fetch(voteapi, object)
    .then((response) =>{
      
      if(response.ok){
        this.setState({

          
        }) 
        this.props.navigation.navigate('Polls');
      }
      
      response.text()
      
    }
    )
    .then((responseData) => {})
    .catch(function(err) {});
  }
}



    
      containerStyle={styles.filterButton}
      
      type='secondary'
      buttonColor={Colors.dustyOrange}
      title={I18n.t('vote')}
      />
        </View>
        
         <View style={styles.iconNav}>
        
        <View style={styles.iconwithnumber}>
        
             <Icons style={styles.icon1} name={`${iconType}-chatbubbles`} size={25} color="gray" />
          
            <Text  style={styles.icon} >
            {/* {list.data.replies_count} */}
            {this.state.repliicon}

            
          
            </Text>
        </View>
        




        <View  style={styles.iconwithnumber}>

         <TouchableWithoutFeedback onPress={()=>{

           
         // categ="Poll" 
         var object = {
                   method: 'POST',
                   headers: {
                     'Accept': 'application/json',
                     'Content-Type': 'application/json',
                     "Authorization": `Bearer ${token}`
                     
                   },
                   body:JSON.stringify( {
                    type:'Poll',
    
          //  body:this.state.comment,
        id:this.props.navigation.state.params.item.id,
              
              
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
                 //console.log(this.state.favicon)
               })
             }
             else{
              this.setState({
                favicon:this.state.favicon -1
              },function(){
                //console.log(this.state.favicon)
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

         // categ="Poll" 
        
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
    
    id:this.props.navigation.state.params.item.id,
    
    
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
                placeholder='اضف تعليق'
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
              
           
         <Image style={styles.avatar } source={{ uri:avatarowner}} /> 
          

        </View>

        <ScrollView style={styles.commentCollection}>
         
          <View style={styles.body}>
      
           {this.state.list1 == 0 && ( 
            <Text style={{paddingHorizontal:3,
              paddingVertical:5 ,fontSize:22 ,textAlign:"center"}}>لا تعليق</Text>
              )} 
              

          {/* {this.state.list.replies.data.length > 0 && ( */}
          {this.state.list1.length > 0 && (
             <CommentList
             data={this.state.list1}
             onItemPress={this.onCardPress}
            
             />
           
            
           )} 
        
      </View>
          </ScrollView>
      
        

          </View>
    }
 
 </View> 

         
        )
      }

      
  render () {
  console.log("::::")
console.log(this.props.navigation.state.params.item)
// data.user_id
console.log("::::")

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

OpinionBeforeVoting.propTypes = {
  navigation: object
}


const mapStateToProps = (state, ownProps) => {

  token=state.login.token
  profileid=state.login.user.id
  avatarowner=state.login.user.avatar


  
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



OpinionBeforeVoting.defaultProps = {
  signup: () => {},

  fetching: false,
  errors: false
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OpinionBeforeVoting)
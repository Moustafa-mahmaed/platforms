import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import moment from 'moment'
import I18n from '../../../I18n/I18n'
import Icon from "react-native-vector-icons/FontAwesome"
 import Ionicons from "react-native-vector-icons/Ionicons"
 import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import Ioicon from "react-native-vector-icons/Ionicons"
import Icons from 'react-native-vector-icons/Ionicons'
let countryname,cityname;
const api = 'https://forums.influancy.com/api/replies';
let token,postowner,categ;
import CommentList from "../../../Components/CommentList"
let avatarowner;
let colorpage=true;
 


import TextInput from "../../../Components/Controls/TextInput";

import {
  Text,
  View,
  ScrollView,
  Image,
  StatusBar,
  Platform,
  Dimensions,
  ActivityIndicator,
  TouchableWithoutFeedback
} from 'react-native';
import HTML from 'react-native-render-html'

import Button from '../../../Components/Controls/Button'

import PostActions from '../../../Redux/Actions/Post'

import styles from './styles'

import { Colors } from '../../../Theme'
import colors from '../../../Theme/Colors'

const IS_IOS = Platform.OS === 'ios'
let iconType = IS_IOS ? 'ios' : 'md'


class DetailsScreen extends Component {
  constructor (props) {
    super(props)
    this.state={
      switchvalue:"",
      idvalue:null,
      comment:"",
      visible1:false,
      visible:false,
      list:[],
      reload:false,
      repliicon:"",
      favicon:"",
      fetching:false
    }
     const { category, item } = props.navigation.state.params
    
  }

  
  
componentDidMount(){



  
  switch (this.props.navigation.state.params.item.data.type)
  {
   
  
      case "workshops": 
      colorpage=false,
      categ="Workshop";
    
      break;
      
      
      case "events": 
       colorpage=true,
     categ="Event";
   
     
     break;
   
  
    default: 
    
  }


  const api_replies ="https://forums.influancy.com/api/replies";
  let api_with_categries=`${api_replies}/${this.props.navigation.state.params.item.data.id}/${categ}`
  
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
        list:responseJson.data.data,
        reload:true
      })
      //console.log(this.state.list)

    })

  .catch(function(err) {});

  
  const cate ="https://forums.influancy.com/api";
  let api1_with_categries=`${cate}/${this.props.navigation.state.params.item.data.type}/${this.props.navigation.state.params.item.data.id}`
 
 console.log("sss")
  console.log(api1_with_categries)
 console.log("sss")
  
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
      console.log(responseJson);
   this.setState({
    favicon:responseJson.data.favorites_count,
    repliicon:responseJson.data.replies_count
   })
  
   //console.log(":::::::::::::::::::::::::::::::::")
   //console.log(responseJson)
   //console.log(":::::::::::::::::::::::::::::::::")

for(let i=0 ;i< responseJson.data.favorites.length ;i++){
  if (responseJson.data.favorites[i].user_id === postowner) {
    this.setState({click:true})
     }
} 




    })

  .catch(function(err) {});



}



reloadcomment=()=>{
  
  
  switch (this.props.navigation.state.params.item.data.type)
  {
   
   case "discussions":
     
      categ="Discussion"
      
      break;
      
      case "questions":
      categ="Question"
      break;
      
      case "cooperations": 
      categ="Cooperation"
      break;
      
      
      
      case "events": 
     categ="Event"
     break;
     
     
     
     case "polls": 
      categ="Poll"
    break;
    
  
    default: 
    
  }


  const api_replies ="https://forums.influancy.com/api/replies";
  let api_with_categries=`${api_replies}/${this.props.navigation.state.params.item.data.id}/${categ}`

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
        list:responseJson.data.data,
        reload:false
        
      })
    
    

    })

  .catch(function(err) {});


}

    
    renderPost = () => {
      
    const {
      data: {
        user_id,
        id,
        title,
        created_at,
        favorites_count,
        replies_count,
        address,
        country,
        start_date,
        end_date,
        city,
        body,
        imagePath,
          userAvatar,
           userFullName ,
        slug
      }
    } = this.props.navigation.state.params.item.data;
    try{
      if(this.props.data !==null && this.props.data !==undefined &&
       this.props.data.data !==null && this.props.data.data !==undefined && 
       this.props.data.data.country !==null && this.props.data.data.country !==undefined &&
       this.props.data.data.city !==null && this.props.data.data.city !==undefined ){

      countryname=this.props.data.data.country.name;
      cityname=this.props.data.data.city.name
       }else{
         countryname="";
         cityname="";
       }
    }catch{

    }
    let {colorpage}=this.props
    // //console.log(this.props)
    return (
     
         <View>
        <Image style={styles.headerimg} source={{ uri:imagePath }} />
        {this.renderBackButton()}
        <View style={[styles.datetime,{backgroundColor: colorpage ? `${Colors.deepSkyBlue}` :`${Colors.purble}` }]}>
         <Text style={styles.date}>
           
         {moment(start_date).format('Do MMMM YYYY')}
              
            </Text> 

        </View>
        <View style={styles.containerDetails}>

        <View style={styles.titleCotainer}>
          <Text style={styles.title}>
                {title}
            </Text>
       
         


        </View>
        <View style={styles.textWithIcon}>
        <Ionicons size={30} color={colorpage}  name="md-time" />
              <Text style={styles.datetimetext}>
              
              {moment(start_date).locale('en').format('hh:mm')}
               :  {moment(end_date).locale('en').format('hh:mm')}
              </Text>
        </View>
        <View style={styles.TwoDateTime}>
        <View style={styles.textWithIcon}>
        <MaterialIcons size={30} color={colorpage}  name="date-range" />
              <Text style={styles.datetimetext}>  {moment(start_date).locale('en').format('DD-MM-YYYY')}</Text>
        </View>
        <View style={styles.textWithIcon}>
        <MaterialIcons size={30} color={colorpage}  name="date-range" />
              <Text style={styles.datetimetext}>  {moment(end_date).locale('en').format('DD-MM-YYYY')}</Text>
        </View>
        </View>
        
      

        </View>
        <View style={styles.locationStyle}>
          <View style={styles.locationInfo}>
            <Text style={[styles.city,{color:colorpage}]}>
          
           {countryname}

        
           
             </Text>
            <Text style={styles.sublocation}>
            {cityname}
            </Text>
            <Text style={styles.sublocation}>
              {address}
            </Text>
          </View>
          <View style={[ styles.iconcontainer, {backgroundColor: colorpage ? `${Colors.deepSkyBlue}` :`${Colors.purble}` }]}>
         
        <Ionicons size={45} color={colors.white}   name="ios-pin"  style={styles.locationiconstyle}/>


          </View>
        </View>
        <View style={styles.description}>
          <Text style={styles.descriptionstyle}>التفاصيل</Text>
            <Text style={{
      fontFamily:"frutiger-lt-arabic-65-bold",
      paddingHorizontal:15

            }}>
         {slug} 
             </Text> 
              
             
        <HTML
          html={`<div>${body}</div>`}
          imagesMaxWidth={Dimensions.get('window').width}
          tagsStyles={{
            div: { textAlign: 'right' ,paddingHorizontal:20 },
            img: { alignSelf: 'center' }
          }}
        />
        </View>
        <View>
        <View style={styles.iconNav}>
         
         <View style={styles.iconwithnumber}>
            <Icons style={styles.icon1} name={`${iconType}-chatbubbles`} size={25} color="gray" />
            <Text  style={styles.icon} >
            
            {this.state.repliicon}
            </Text>
        </View>
         <View  style={styles.iconwithnumber}>
         <TouchableWithoutFeedback onPress={()=>{
           switch (this.props.navigation.state.params.item.data.type)
           {
           
              
               
               
            case "workshops": 
              categ="Workshop"
              break;
               
               
               
               case "events": 
              categ="Event"
              break;
              
              
              
              
             
           
             default: 
           
           }
         
               
                 
                 
                 var object = {
                   method: 'POST',
                   headers: {
                     'Accept': 'application/json',
                     'Content-Type': 'application/json',
                     "Authorization": `Bearer ${token}`
                     
                   },
                   body:JSON.stringify( {
                     type:categ,
                     
             
              
            
              id:this.props.navigation.state.params.item.data.id,
              
              
             })
   
           };
           
            const apilike=`https://forums.influancy.com//api/favorites`
             fetch(apilike, object)
             .then((response) =>{
         console.log(response);
         
               if(response.ok){
             console.log(response);
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
           {this.state.favicon}
           </Text>
        </View>

        </View>

        </View>
        {/* <View style={styles.commentwithavator}>
        

        <Ioicon 
         style={[{ transform: [{ rotate: "180deg"},{translateY:50 }] },styles.inputstyle]}
         name="md-send" size={25} color="#900" />
              <TextInput    />
              
        <Image style={styles.avatar } source={{ uri: avatar }} />
          

        </View>
        <ScrollView style={styles.commentCollection}>
          <Text>لا تعلق</Text>
          </ScrollView> */}
          <View style={styles.commentwithavator}>
        

        <Ioicon 
         style={[{ transform: [{ rotate: "180deg"},{translateY:50 }] },styles.inputstyle]}
         name="md-send" size={25} color="#900" 
         onPress={()=>{
         
            switch (this.props.navigation.state.params.category)
            {
            
              case "events": 
              categ="Event"
              break;

              case "workshops": 
              categ="Workshop"
              break;
            
              default: 
              
            }
        
          var object = {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              "Authorization": `Bearer ${token}`
              
            },
            body:JSON.stringify( {
              type:categ,
              
       body:this.state.comment,
       
       id:id,
       
       
      })
    };
const api_replies ="https://forums.influancy.com/api/replies";
    if(!this.state.fetching){
            this.setState({fetching:true})
      fetch(api_replies, object)
      .then((response) =>{
      
        
        if(response.ok){

          this.setState({

            comment:"",
            repliicon:this.state.repliicon +1
            

          }) 
          this.reloadcomment()
     
        }
        
        response.text()
        
      }
      )
      .then((responseData) => {})
      .catch(function(err) {});
    }}
  }
  
  
         />
              <TextInput   
                placeholder={I18n.t('addcomment')}
                autoGrow={true}
               
                dataDetectorTypes='all'
                enablesReturnKeyAutomatically={true}
                style={styles.writeComment}
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

        <ScrollView style={[styles.commentCollection]}>
          {/* {this.renderList()} */}
          <View style={styles.body}>
        {/* { this.props.data.replies.data.length < 0 && (
          <ActivityIndicator
            size='small'
            color={Colors.jungleGreen}
            style={styles.fetching}
          />
        )} */}
          {this.state.list == 0 && (
            <Text style={{paddingHorizontal:3,
              fontFamily:"frutiger-lt-arabic-65-bold",
            paddingVertical:5 ,fontSize:22 ,textAlign:"center"}}>لا تعليق</Text>
          )}

          {this.state.list.length > 0 && (
        <CommentList
          data={this.state.list}
          onItemPress={this.onCardPress}
          // handleLoadMore={this.handleLoadMore}
          // loadingMore={loadingMore}
        />
          
          )}
      </View>
          </ScrollView>
        
      </View>
    
          
        
   
    )
  }

  renderBackButton = () => {
    return (
      <Button
      
        onPress={() => {
          this.props.navigation.goBack()
        }}
        iconSettings={{
          iconName: `${iconType}-arrow-back`,
          iconSize: 30,
          iconTintColor: Colors.basic.white
        }}
        type='transparent'
        buttonColor={Colors.basic.black}
        containerStyle={styles.backButton}
      />
    )
  }

 



  render () {
     const { data, fetching ,colorpage} = this.props.navigation.state.params.item.data

     // //console.log(this.props)
    
    
    return (
      <ScrollView style={styles.root}>
         <StatusBar barStyle='dark-content' />
       
        {data && this.renderPost()} 
       
      </ScrollView>
    )
  }
}

DetailsScreen.propTypes = {
   navigation: PropTypes.object
}

DetailsScreen.defaultProps = {
  navigation: {}
}

const mapStateToProps = (state, ownProps) => {
  token =state.login.token
  postowner=state.login.user.id
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
)(DetailsScreen)
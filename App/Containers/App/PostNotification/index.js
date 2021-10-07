import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import moment from 'moment'
import Icon from "react-native-vector-icons/FontAwesome"
import Ioicon from "react-native-vector-icons/Ionicons"
import * as Yup from 'yup'

import { Formik } from 'formik'
import CommentListItem from "../../../Components/CommentListItem"
import CommentList from "../../../Components/CommentList"
import I18n from '../../../I18n/I18n'
import Message from '../../../Components/Message'
import TextInput from "../../../Components/Controls/TextInput";
let avatarowner;

let token,postowner,categ
import {
  Text,
  View,
  ScrollView,
  Image,
  StatusBar,
  Platform,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
  TouchableWithoutFeedback
  
} from 'react-native'

import HTML from 'react-native-render-html'
import Icons from 'react-native-vector-icons/Ionicons'
import Button from '../../../Components/Controls/Button'

import PostActions from '../../../Redux/Actions/Post'

import styles from './styles'

import { Colors } from '../../../Theme'
import { Constants } from '../../../Services/Constants';

const {width}=Dimensions.get("window")

const IS_IOS = Platform.OS === 'ios'
let iconType = IS_IOS ? 'ios' : 'md'


  class PostScreen extends Component {
    constructor (props) {
      super(props)
    const { category, item } = props.navigation.state.params
    this.props.getPost(category, item.id)



    
  }



  state = {
list:[],
showmsg:false,
      user:{},
EditItem:[],
      fetchedComments: [],
      enteredComment: '',
      commentsAfterCommenting: [],
      refresh: false,
      click:false,
      reload:false,
      switchvalue:"",
      idvalue:null,
      comment:"",
      favicon:"",
      repliicon:"",
      fetching:false
  }

  componentWillReceiveProps(nextProps) {
 
    if (nextProps.filters !== this.props.filters) {
      this.props.dispatch(getPost(nextProps.filters));
    }
  }

componentDidMount(){

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
  console.log(api_with_categries);
  
  
  
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

    })

  .catch(function(err) {});

  const cate ="https://forums.influancy.com/api";
  let api1_with_categries=`${cate}/${this.props.navigation.state.params.item.data.type}/${this.props.navigation.state.params.item.data.id}`
  console.log(api1_with_categries)
  
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
  
    //console.log(responseJson)
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

  renderList = () => {
  
     const {list}=this.props.replies.data
   

    return (
      <View style={styles.body }>
      { list.length > 0 && (
          <ActivityIndicator
            size='small'
            color={Colors.jungleGreen}
            style={styles.fetching}
          />
        )} 

      <CommentList
        
          data={list}
       //  onItemPress={this.onCardPress}
          handleLoadMore={this.handleLoadMore}
          loadingMore={loadingMore}
        /> 
      </View>
    )
}

  onCardPress = (route, item) => {

    this.props.navigation.navigate(route,  item )
   
  }



  renderPost = () => {
    
    const {
      data: {
        user_id,
        title,
        created_at,
        favorites_count,
        replies_count,

         userAvatar, userFullName ,
        body,
        id,
        
      }
  
    } =  this.props.navigation.state.params.item.data

    
   
    return (
      <View style={styles.header}>
     
        <Text style={styles.title}>{title}</Text>

  
    <View style={styles.avatarHeader}>
          <View style={styles.avatarTitles}>
            <Text style={styles.name}>{userFullName}</Text>
            <Text style={styles.date}>
            
              {moment(created_at, 'YYYYMMDD hhmm').fromNow()}
            </Text>
          </View>
       
          <Image style={styles.avatar} source={{ uri: userAvatar }} />
          
        </View>

        <HTML
          html={`<div>${body}</div>`}
          imagesMaxWidth={Dimensions.get('window').width}
          tagsStyles={{
            div: { textAlign: 'right' ,fontFamily:"frutiger-lt-arabic-65-bold" },
            img: { alignSelf: 'center' }
          }}
          />
      
        <View>
        <View style={styles.iconNav}>
      
        
        <View style={styles.iconwithnumber}>
            <Icons style={styles.icon1}  name={`${iconType}-chatbubbles`} size={25} color="gray" />
            <Text  style={styles.icon} >
            
            {this.state.repliicon}
            </Text>
        </View>
        <View  style={styles.iconwithnumber}>
          {/*  */}
          <TouchableWithoutFeedback onPress={()=>{
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
   
         
          }}>

          <Icon style={styles.icon1} name={this.state.click?"heart":"heart-o" } size={25} color={this.state.click?"#ED4956":"gray" } />
          </TouchableWithoutFeedback>
          <Text  style={styles.icon} >
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
      
      case "competitions": 
     categ="Competition"
     break;
      
     case "polls": 
      categ="Poll"
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
                style={{
                  fontFamily:'frutiger-lt-arabic-65-bold'
                }}
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
      
{/* {this.props.data.replies.data.length == 0 && ( */}
          { this.state.list == 0 && (
          // {this.props.data.comments.data.length == 0 && (
            <Text style={{paddingHorizontal:3,
              paddingVertical:5 ,fontSize:22 ,textAlign:"center",fontFamily:'frutiger-lt-arabic-65-bold'}}>لا تعليق</Text>
              )}
              

              {this.state.list.length > 0 && (
          //  {this.props.data.comments.data.length > 0 && (
            <CommentList
          //  data={this.props.data.replies.data}
          // data={this.state.list.reverse()}
          data={this.state.list}
            onItemPress={this.onCardPress}
            
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
          iconSize: 25,
          iconTintColor: Colors.basic.black
        }}
        type='transparent'
        buttonColor={Colors.basic.black}
        containerStyle={styles.backButton}
      />
      )
    }
    




  render () {
   


    const { data } = this.props.navigation.state.params.item.data
  

    
  
 console.log(this.props.navigation.state.params.item.data);

   
   
 
    return (
      <ScrollView style={styles.root }>
        <StatusBar barStyle='dark-content' />
        {this.renderBackButton()}
      
        {data  && this.renderPost()}
        {/* <Text> hiiiii </Text> */}
       
      </ScrollView>
    )
  }
}

PostScreen.propTypes = {
  navigation: PropTypes.object
}

PostScreen.defaultProps = {
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
)(PostScreen)


// import React, { Component } from 'react'
// import { Text, View } from 'react-native'

// export default class PostScreen extends Component {
//   render() {
//     console.log('this.props')

//     console.log(this.props)
//     return (
//       <View>
//         <Text> hhhhhhh </Text>
//       </View>
//     )
//   }
// }

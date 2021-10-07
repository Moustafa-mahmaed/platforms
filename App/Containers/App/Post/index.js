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
  Alert,
  ToastAndroid,
  ActivityIndicator,
  TouchableWithoutFeedback
  
} from 'react-native'
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuProvider ,
  
} from 'react-native-popup-menu';
import HTML from 'react-native-render-html'
import Icons from 'react-native-vector-icons/Ionicons'
import Button from '../../../Components/Controls/Button'

import PostActions from '../../../Redux/Actions/Post'

import styles from './styles'

import { Colors } from '../../../Theme'
import { Constants } from '../../../Services/Constants';
// const { SlideInMenu } = renderers;
const {width}=Dimensions.get("window")

const IS_IOS = Platform.OS === 'ios'
let iconType = IS_IOS ? 'ios' : 'md'
const Toast = (props) => {
  if (props.visible) {
    ToastAndroid.showWithGravityAndOffset(
      props.message,
      ToastAndroid.LONG,
      ToastAndroid.TOP,
      25,
      50,
      
    );
    return null;
  }
  return null;
};

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

  // alertmessage = () =>{
 

  //   <Menu>
  //     <MenuTrigger text='Select action' />
  //     <MenuOptions>
  //       <MenuOption onSelect={() => alert(`Save`)} text='Save' />
  //       <MenuOption onSelect={() => alert(`Delete`)} >
  //         <Text style={{color: 'red'}}>Delete</Text>
  //       </MenuOption>
  //       <MenuOption onSelect={() => alert(`Not called`)} disabled={true} text='Disabled' />
  //     </MenuOptions>
  //   </Menu>

  // }
  componentWillReceiveProps(nextProps) {
 
    if (nextProps.filters !== this.props.filters) {
      this.props.dispatch(getPost(nextProps.filters));
    }
  }

componentDidMount(){


  
  switch (this.props.navigation.state.params.category)
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
        list:responseJson.data.data,
        reload:true
      })

    })

  .catch(function(err) {});

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
  
  
  switch (this.props.navigation.state.params.category)
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
        list:responseJson.data.data,
        reload:false
        
      })
    

    })

  .catch(function(err) {});


}

  renderList = () => {
   
    // const {list}=this.props.replies.data
   

    return (
      <View style={styles.body }>
        {/* { list.length > 0 && (
          <ActivityIndicator
            size='small'
            color={Colors.jungleGreen}
            style={styles.fetching}
          />
        )} */}

        {/* <CommentList
        
          data={list}
       //  onItemPress={this.onCardPress}
          handleLoadMore={this.handleLoadMore}
          loadingMore={loadingMore}
        /> */}
      </View>
    )
}


  renderList = () => {
   
    // const {list}=this.props.replies.data
   

    return (
      <View style={styles.body }>
        {/* { list.length > 0 && (
          <ActivityIndicator
            size='small'
            color={Colors.jungleGreen}
            style={styles.fetching}
          />
        )} */}

        {/* <CommentList
        
          data={list}
       //  onItemPress={this.onCardPress}
          handleLoadMore={this.handleLoadMore}
          loadingMore={loadingMore}
        /> */}
      </View>
    )
  }
  onCardPress = (route, item) => {

    this.props.navigation.navigate(route,  item )
   
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
deleteitem(){
  
  var object = {
    method: 'delete',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`
      
    }
  };
  
      
  fetch(`https://forums.influancy.com/api/${this.props.navigation.state.params.category}/${this.props.navigation.state.params.item.id}
  `,object)
  .then((response) =>{
    
    
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
  renderPost = () => {
    
    const {
      data: {
        user_id,
        title,
        created_at,
        favorites_count,
        replies_count,

        user: { avatar, fullName , },
        body,
        id,
        
      }
    } = this.props.data
    
   
    return (
      <View style={styles.header}>
        {/* <ImageBackground  source={{uri: 'https://cdn.zeplin.io/5d137bbe05fe2b049f827d9f/assets/bc7786b1-780f-44d5-b1b7-d43d15be5e2f.png'}}
        style={{width:width,height:200,bottom:0 ,opacity:1}}> */}
      
        <Text style={styles.title}>{title}</Text>
      { user_id == postowner?
      


// //////////////////
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
        // <View>

        //   <TouchableWithoutFeedback onPress={()=>{
            
        
        //     this.setState({
        //       showmsg:!this.state.showmsg
        //     })            
        //   }
        // }>

        // <Icon style={styles.icon} name="ellipsis-h" size={25} color="black" />
        //   </TouchableWithoutFeedback>
        //    <MenuProvider>
 
        //    { this.state.showmsg && this.renderHighlight()}
        //    </MenuProvider>
          
        // </View>

      
  }
    {/* </ImageBackground> */}
    <View style={styles.avatarHeader}>
          <View style={styles.avatarTitles}>
            <Text style={styles.name}>{fullName}</Text>
            <Text style={styles.date}>
            
              {moment(created_at, 'YYYYMMDD hhmm').fromNow()}
            </Text>
          </View>
           <TouchableOpacity  onPress={()=>{

              this.props.navigation.navigate('Guest', this.props.data.data.user)
            
              
            }
          
        }>
          <Image style={styles.avatar} source={{ uri: avatar }} />
          </TouchableOpacity>
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
        <Toast style={{backgroundColor:"green" ,padding:20}} visible={this.state.visible} message="تم اضافه سوال" />
        <Toast style={{backgroundColor:"green" ,padding:20}} visible={this.state.visible1} message="تم حذف السوال" />
        
        <View style={styles.iconwithnumber}>
            <Icons style={styles.icon1}  name={`${iconType}-chatbubbles`} size={25} color="gray" />
            <Text  style={styles.icon} >
            
            {this.state.repliicon}
            </Text>
        </View>
        <View  style={styles.iconwithnumber}>
          {/*  */}
          <TouchableWithoutFeedback onPress={()=>{
        switch (this.props.navigation.state.params.category)
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
                  
          
           
           id:id,
           
           
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
           
           
           
          switch (this.props.navigation.state.params.category)
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

        // FUNCTION REPORTS

    Reportfuction=()=>{
      this.props.navigation.navigate('Report',{id :this.props.data.data.id ,category:this.props.navigation.state.params.category,token:token})
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
      <MenuOption value={1} text='تعديل' onSelect={value => this.onSelectorClicked(value)} />
      <MenuOption value={2} text='حذف' onSelect={value => this.onSelectorClicked(value)} />

    </MenuOptions>




  );
}


  render () {
   

    
// //console.log(this.props)
    
    const { data, fetching } = this.props

    
  
   
   
 
    return (
      <ScrollView style={styles.root }>
        <StatusBar barStyle='dark-content' />
        {this.renderBackButton()}
        {fetching && (
          <ActivityIndicator
            size='small'
            color={Colors.basic.black}
            style={styles.fetching}
          />
        )}
        {data && !fetching && this.renderPost()}
       
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

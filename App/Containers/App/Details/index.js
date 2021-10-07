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
 
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuProvider ,
  renderers
} from 'react-native-popup-menu';

import TextInput from "../../../Components/Controls/TextInput";

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

import {
  Text,
  View,
  ToastAndroid,
  ScrollView,
  Image,
  StatusBar,
  Platform,
  Dimensions,
  Alert,
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
     this.props.getPost(category, item.id)
  }

  
  
componentDidMount(){


  
  switch (this.props.navigation.state.params.category)
  {
   
  
      case "workshops": 
      categ="Workshop"
      break;
      
      
      case "events": 
     categ="Event"
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
      //console.log(this.state.list)

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


  deleteitem(){
    // //console.log(this.props.navigation.state.params.item.id)
    try{

      let object = {
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
      //console.log(response)
      
      if(response.ok){
        if(this.props.navigation.state.params.category=="events"){
          
          this.setState({
            visible1:true
          })
        }
        else if(this.props.navigation.state.params.category=="workshops"){
          
          this.setState({
            visible1:true
          })
        }
        else{
          this.setState({
            visible:true
          })
        }
        
        this.props.navigation.navigate('Home');
        
      }
      
      response.text()
    }
    )
    .then((responseData) => {})
    .catch(function(err) {});
  }catch{
    
  }
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
        user: { avatar, fullName },
        slug
      }
    } = this.props.data;
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
        <View style={[styles.datetime,{backgroundColor:colorpage}]}>
         <Text style={styles.date}>
           
         {moment(start_date).format('Do MMMM YYYY')}
              
            </Text> 

        </View>
        <View style={styles.containerDetails}>

        <View style={styles.titleCotainer}>
          <Text style={styles.title}>
                {title}
            </Text>
            { user_id == postowner?
      


      // //////////////////
      <View style={{position:"relative"}}>
      
      <TouchableWithoutFeedback onPress={()=>{
        
      
        this.setState({
          showmsg:!this.state.showmsg
        })            
      }
      }>
      
      <Icon style={styles.icon} name="ellipsis-h" size={25} color="black" />
      </TouchableWithoutFeedback>
       <MenuProvider >
      
       { this.state.showmsg && this.renderHighlight1()}
       </MenuProvider>
      
      </View>
      // /////////////////////
              :
              <View style={{position:"relative"}}>
      
      <TouchableWithoutFeedback onPress={()=>{
        
      
        this.setState({
          showmsg:!this.state.showmsg
        })            
      }
      }>
      
      <Icon style={styles.icon} name="ellipsis-h" size={25} color="black" />
      </TouchableWithoutFeedback>
       <MenuProvider >
      
       { this.state.showmsg && this.renderHighlight()}
       </MenuProvider>
      
      </View>
           
      
            
        }

         

            <Toast style={{backgroundColor:"green" ,padding:20}} visible={this.state.visible1} message="تم حذف الفعالية" />
        <Toast style={{backgroundColor:"green" ,padding:20}} visible={this.state.visible} message="تم حذف ورشه العمل" />

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
          <View style={[ styles.iconcontainer,{backgroundColor:colorpage}]}>
         
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
               {/* <HTML
          html={`<div>${body}</div>`}
          imagesMaxWidth={Dimensions.get('window').width}
          tagsStyles={{
            div: { textAlign: 'right' },
            img: { alignSelf: 'center' }
          }}
        /> */}

             
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
           switch (this.props.navigation.state.params.category)
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
  onSelectorClicked = (value) => {
    if(value == 1) {
      
      this.props.navigation.navigate(this.props.navigation.state.params.Edit ,{item:this.props.data.data})
       /// this.props.navigation.navigate(this.props.navigation.state.params.Edit,this.props.data)
       
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

  Reportfuction(){
    this.props.navigation.navigate('Report',{id :this.props.data.data.id ,category:this.props.navigation.state.params.category,token:token})
  }

renderHighlight() {


  return (

   
    <MenuOptions  style={{height:50,width:150 ,textAlign:"center",backgroundColor:'rgba(184,184,184, 0.8)',borderRadius:30,paddingHorizontal:5,paddingTop:2}}>
  
    <MenuOption value={3}  style={{textAlign:"center" ,paddingTop:10}} text='إبلاغ عن إساءة' onSelect={value => this.onSelectorClicked(value)} />

  </MenuOptions>

  );
}
// ////////////////////////

renderHighlight1() {


return (

  <MenuOptions  style={{height:70,width:150,backgroundColor:'rgba(184,184,184, 0.8)',paddingHorizontal:10,paddingVertical:4}}>
    <MenuOption value={1} text='تعديل' onSelect={value => this.onSelectorClicked(value)} />
    <MenuOption value={2} text='حذف' onSelect={value => this.onSelectorClicked(value)} />

  </MenuOptions>




);
}

  render () {
     const { data, fetching ,colorpage} = this.props
     // //console.log(this.props)
    
    
    return (
      <ScrollView style={styles.root}>
         <StatusBar barStyle='dark-content' />
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

  let colorpage;
  try{

    switch(state.categoriesFeaturedItems.category){
      case "workshops":
        colorpage=Colors.purble;
        break;
        case "events" :
          colorpage=Colors.deepSkyBlue;
          break;
          default :
          return 0   
          
        }
      }catch{
        
      }
 
  return {
    data: state.post.data,
    fetching: state.post.fetching,
    errors: state.post.errors,
    colorpage:colorpage

    
  }
}

const mapDispatchToProps = dispatch => ({
  getPost: (category, id) => dispatch(PostActions.postRequest(category, id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailsScreen)

// export default DetailsScreen;

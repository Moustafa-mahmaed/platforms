  import React, { Component } from 'react'
  import PropTypes from 'prop-types'

  import { connect } from 'react-redux'
import Constants from '../../Services/Constants'
  import { View, Text, Image, TouchableOpacity } from 'react-native'
// import {AsyncStorage} from 'react-native';
const { TOKEN_KEY, USER_KEY } = Constants
import AsyncStorage from '@react-native-community/async-storage';

  import I18n from '../../I18n/I18n'

  import styles from './styles'
  let profilecheck;
  let profilecheck1;
  let token ,social;
  let key2;
  let flag;
  let userid;
  class PrimaryListItem extends Component {
  

    state={
  waiter:false
    }
    

    componentDidMount(){
      AsyncStorage.getItem(TOKEN_KEY).then((value) => {

             if (value !== null) {
               token=value
                  console.log( value);
             }
         });
         try{
            AsyncStorage.getItem('SOCILA_MEDIA').then((value) => {

             if (value !== null) {
               social=value

                  console.log( "social:" + social);
             }
         });

         }catch{

         }
     
      fetch(`https://forums.influancy.com/api/profiles/${userid}`,{  headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
      }})
          .then((response) => response.json())
          .then((responseJson) => {
            console.log("::"+ JSON.stringify( responseJson ) )
          
           
        
         
         if(responseJson.error =="Complete your profile"){
               
   console.log("Complete your profile 1")
                //async
                try {
                  AsyncStorage.setItem('profilecheck', "false");
           
                  } catch (error) {
                   
                  }
             

            }
            
             else if(responseJson.message=="Unauthenticated."){
                // console.log("هاااااااااا")
                 fetch(`https://forums.influancy.com/api/profiles/${userid}`,{  headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
      }})
          .then((response) => response.json())
          .then((responseJson) => {
             
              console.log(responseJson)
             if(responseJson.error =="Complete your profile"){
               console.log("Complete your profile  inside Unauthenticated")
                  flag=false
                //async
                try {
                  AsyncStorage.setItem('profilecheck', "false");
           
                  } catch (error) {
                   
                  }
             

            }
            // else if(social !==""){
              
            //   if(responseJson.profile !== false){
            //     try {
            //    AsyncStorage.removeItem("profilecheck")
            //       } catch (error) {
                    
            //       }

            //   }
              else{
                
               console.log("remove  inside Unauthenticated")
                flag=true
                 try {
               AsyncStorage.removeItem("profilecheck")
                  } catch (error) {
                    
                  }

              }

           
            
          
          })
             }
           
          //   else{

          //     //  console.log( "error mess :"+ JSON.stringify(responseJson))

            
          //       //async
          // try {
          //      AsyncStorage.removeItem("profilecheck")
          //         } catch (error) {
                    
          //         }
             
            
          //   }
          })
          .catch((error) =>{ 
        
          });


         
          

    }




    onPress = () => {
      const { onItemPress } = this.props
      const { title } = this.props.data

      let route
    // //console.log('profilecheck : ')

    // //console.log(value)
          
  if( flag == false ){
     route="CompleteProfile"
    onItemPress(route)

   
  }else{
   




  
   if (title === I18n.t('homeList.mainHall')) {
      route = 'MainHall'
    }

    if (title === I18n.t('homeList.q&a')) {
      route = 'Questions'
    }

    if (title === I18n.t('homeList.cooperate')) {
      route = 'Cooperations'
    }

    if (title === I18n.t('homeList.events')) {
      route = 'Events'
    }

    if (title === I18n.t('homeList.market')) {
      route = 'Soon'
    }

    if (title === I18n.t('homeList.competitions')) {
      route = 'Competitions'
    }

    if (title === I18n.t('homeList.workshop')) {
      route = 'Workshop'
    }

    if (title === I18n.t('homeList.polls')) {
      route = 'Polls'
    }

    onItemPress(route)
  }
  }

    render () {
      const { style } = this.props
      const { title, icon, color, backgroundColor } = this.props.data

      return (
        <TouchableOpacity
          onPress={this.onPress}
          style={[styles.root, style, { backgroundColor }]}
        >
          <Text style={[styles.title, { color }]}>{title}</Text>

          <View style={[styles.iconContainer, { backgroundColor: color }]}>
            <Image style={styles.icon} source={icon} />
          </View>
        </TouchableOpacity>
      )
    }
  }

  PrimaryListItem.propTypes = {
    style: PropTypes.object
  }

  PrimaryListItem.defaultProps = {
    style: {}
  }


  const mapStateToProps = (state, ownProps) => {

    try{
    profilecheck1=state.login.profile;
    //token=state.login.token;
    userid=state.login.user.id

    // //console.log(profilecheck1)
    }catch(e){
     
    }

    return {

      tags: state.tags.tags
    }

  }

  const mapDispatchToProps = dispatch => ({

    getTags: category => dispatch(TagsActions.tagsRequest(category))

  })


  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(PrimaryListItem)


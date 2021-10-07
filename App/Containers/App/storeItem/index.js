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

        const api = 'http://192.168.1.100:8000/api/replies';

  let token
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
  } from 'react-native'
  import HTML from 'react-native-render-html'

  import Button from '../../../Components/Controls/Button'

  import PostActions from '../../../Redux/Actions/Post'

  import styles from './styles'

  import { Colors } from '../../../Theme'
  import { Constants } from '../../../Services/Constants';


  const IS_IOS = Platform.OS === 'ios'
  let iconType = IS_IOS ? 'ios' : 'md'

  class StoreItemScreen extends Component {
    constructor (props) {
      super(props)
      // const { category, item } = props.navigation.state.params
      // this.props.getPost(category, item.id)



      
    }




    state = {

        user:{},
  EditItem:[],
        fetchedComments: [],
        enteredComment: '',
        commentsAfterCommenting: [],
        refresh: false,
        
        switchvalue:"",
        idvalue:null,
        comment:""
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

    renderPost = () => {
   
      
      return (
        <View style={{flex:1}} >
       

<ScrollView
  pagingEnabled={true}
  showsHorizontalScrollIndicator={true}
        style={{ backgroundColor:"red" }} horizontal={true}   automaticallyAdjustInsets={true}>
     
     {/* <Image
          style={{width: "100%", height:"100%"}}
          source={{uri: 'https://facebook.github.io/react-native/img/tiny_logo.png'}}
        /> */}
   <View style={{width: "100%", height:"100%" , backgroundColor:"green"}}>
     <Text>xccvcc</Text>
   </View>
   <View style={{width: "100%", height:"100%" , backgroundColor:"blue"}}>
     <Text>xccvcc</Text>
   </View>
   <View style={{width: "100%", height:"100%", backgroundColor:"purple"}}>
     <Text>xccvcc</Text>
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
    

      

      
      const { data, fetching } = this.props

      
      // //console.log(this.props.data)
    
    
  
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
         {this.renderPost()}
          
        </ScrollView>
      )
    }
  }

  StoreItemScreen.propTypes = {
    navigation: PropTypes.object
  }

  StoreItemScreen.defaultProps = {
    navigation: {}
  }

  const mapStateToProps = (state, ownProps) => {
    token =state.login.token
    
    
    
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
  )(StoreItemScreen)

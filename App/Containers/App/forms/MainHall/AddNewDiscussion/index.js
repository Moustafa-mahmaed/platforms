const api="https://forums.influancy.com/api/discussions"
import React, { Component } from 'react'
import { func, bool } from 'prop-types'
import { connect } from 'react-redux'
import Tags from "react-native-tags"
import * as Yup from 'yup'
import { Formik } from 'formik'
import { Text, View, ToastAndroid, ScrollView  ,KeyboardAvoidingView,Platform,TouchableOpacity ,Keyboard} from 'react-native'
import Button from '../../../../../Components/Controls/Button'
import TextInput from '../../../../../Components/Controls/TextInput'

import AntDesign from 'react-native-vector-icons/AntDesign'; 
let token;
import LinearGradient from 'react-native-linear-gradient'
import SignupActions from '../../../../../Redux/Actions/Form'
import I18n from '../../../../../I18n/I18n'
import Message from '../../../../../Components/Message'

import RichText from "../../../../../Components/RichText"
import  CNRichTextEditor , { CNToolbar , getDefaultStyles, convertToObject,convertToHtmlString } from "react-native-cn-richtext-editor";



import styles from './styles'
import { Colors } from '../../../../../Theme/'


const IS_IOS = Platform.OS === 'ios'
let iconType = IS_IOS ? 'ios' : 'md'
const Toast = (props) => {
  if (props.visible) {
    ToastAndroid.showWithGravityAndOffset(
      props.message,
      ToastAndroid.LONG,
      ToastAndroid.TOP,
      25,
      50
    );
    return null;
  }
  return null;
};

class AddNewDiscussion extends Component {
  constructor(props){
    super(props);
    this.state={
      visible: false,
    }
  }
  static navigationOptions = {
    header: null
  }
  
  


  formDefinition = {
  
    initialValues: {
      title: '',
      body: '',
      tags: '',
      
    },
    validationSchema: Yup.object().shape({
      title: Yup.string().required(I18n.t('validation.required')),
      body: Yup.string().required(I18n.t('validation.required')),
      tags: Yup.string().required(I18n.t('validation.required')),
    
    })
  }

  navigate = route => () => {
    this.props.navigation.navigate(route)
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

  _handleSubmit=(values)=>{

    var object = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
      body:JSON.stringify( {
         'title':values.title ,
         'body': values.body,
         "tags":values.tags

      })
  };

  if(!this.state.fetching){
    this.setState({fetching:true})

      fetch(api, object)

      .then((response) =>{


        if(response.ok){

          this.setState({visible:true})
        this.props.navigation.navigate('Home');
      this.props.navigation.navigate('MainHall');
    }
    else if(response.errors){

    }



    response.text()


  }
  )
  .then((responseData) => {


  })
  .catch(function(err) {});

}

}

    renderGradient = () => (
        <LinearGradient
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 1 }}
          colors={[Colors.cerulean, Colors.cerulean]}
          style={styles.gradientHeader}
        />
      )
    
      renderTitle = () => (
        <View style={styles.titleContainer}>
          {this.renderBackButton()}
          <Text style={styles.title}>{I18n.t('AddNewDiscussion')}</Text>
        </View>
      )
    


      renderForm = () => {
        return (
          <Formik
           initialValues= {{
           title: '',
           body: '',
           tags: '',
           
         }}
     
          validationSchema={ Yup.object().shape({
           title: Yup.string().required(I18n.t('validation.required')),
           body: Yup.string().required(I18n.t('validation.required')),
           tags: Yup.string().required(I18n.t('validation.required')),
         
         })
          }
           onSubmit={this._handleSubmit}
          
            render={
                          ({values ,handleSubmit ,submitCount ,setFieldValue ,errors ,
                          touched ,setFieldTouched ,isValid ,isSubmitting }) => (
                 <React.Fragment>
               <View style={styles.formcontainer}>
                 <TextInput
                        value={values.title}
                           onChangeText={text => setFieldValue("title", text)}
                            onBlur={() => setFieldTouched("title")}
                               error={
                               touched.title || submitCount > 0
                                 ? errors.title
                                 : null
                             }
                        placeholder={I18n.t('address')}
                    placeholderTextColor={Colors.gray}
                    

                      style={styles.inputcontainer}
                  
                              style={styles.address}                 
                  />
                       <Message name='title' />
                     <ScrollView>
             <KeyboardAvoidingView >
                        <TextInput
                             value={values.body}
                                onChangeText={text => setFieldValue("body", text)}
                              onBlur={() => setFieldTouched("body")}
                                       error={
                               touched.body || submitCount > 0
                                 ? errors.body
                                 : null
                             }
                                 multiline={true}
                             
                                 numberOfLines={4}
                                 placeholder={I18n.t("article")}
                                 style={styles.textareastyle}placeholderTextColor={Colors.basic.black}
                                 underlineColorAndroid='transparent'
                               />
                               <Message name='body'
                             />   

                        <View>
                            <Tags                             
                                 initialText=""
                                 placeholderTextColor={Colors.gray}
                                style={styles.hashstyle}
                                 textInputProps={{
                                   placeholder: I18n.t('hashtag')
                                 }}
                                 
                                 initialTags={[]}
                                 onChangeTags={tags => {
     
                                   values.tags=tags
                                
                                   
                                 } 
                                 }
                                 onTagPress={(index, tagLabel, event, deleted) =>
                                   console.log(index, tagLabel, event, deleted ? "deleted" : "not deleted")
                                 }                            
                                 inputContainerStyle={{backgroundColor:"white"}}
                                
                                 renderTag={({ tag, index, onPress, deleteTagOnPress, readonly }) => (
                                   <TouchableOpacity key={`${tag}-${index}`} onPress={onPress}>
                                     <Text style={styles.hashTagText}>{tag}</Text>
                                   </TouchableOpacity>
                                 )}
                                          />
                                     <Message name='tags' />
     
                                     </View>
     
         <Toast 
          style={{backgroundColor:"green" ,padding:20}}
          visible={this.state.visible}
           message="تم إضافة مناقشة جديدة" 
           />
                               </KeyboardAvoidingView>
                               </ScrollView>
                 
     
     
                 <View style={[styles.signupSubmitcontainer]}>
                   <Button 
                      style={styles.saveButton}
                    type='secondary'
                    onPress={handleSubmit}
                     disabled={isSubmitting}
                     loading={isSubmitting}
                     buttonColor={Colors.cerulean}
                    title={I18n.t('addButton')}
                   />
                               
                   </View>  
     
                 </View>
                            </React.Fragment>
                        )
            }
          
          
          
          
          
           />
        )
       
      }
     
     
     
     
     
      
      
      
      
  render () {
    
    return (
      <View style={styles.root}>
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.root}>
            <View style={styles.root}>
      {this.renderGradient()}
        {this.renderTitle()}
      <View>
      

        {this.renderForm()}
      </View>
      
        
      </View>
      
      </View>
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state, ownProps) => {

 token=state.login.token;

  return {
  
 
  }
}



export default connect(
  mapStateToProps,
  null
)(AddNewDiscussion)








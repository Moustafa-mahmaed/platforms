import React, { Component } from 'react'
import { object } from 'prop-types'
import { View,StyleSheet,ToastAndroid, Text , Platform, Dimensions , Button as Btn,Icon, ListView,TextInput, KeyboardAvoidingView , Keyboard,ScrollView } from 'react-native'
 import TextInput1 from '../../../../../Components/Controls/TextInput'
 import Entypo from 'react-native-vector-icons/Entypo';
 import Ionicons from 'react-native-vector-icons/Ionicons';

 import { func, bool } from 'prop-types'
const api="https://forums.influancy.com/api/polls"

import Message from '../../../../../Components/Message'

import { Formik } from 'formik'
import * as Yup from 'yup'


import { connect } from 'react-redux'
import SignupActions from '../../../../../Redux/Actions/pollform'
import Button from '../../../../../Components/Controls/Button'
import LinearGradient from 'react-native-linear-gradient'

import I18n from '../../../../../I18n/I18n'

import styles from './styles'
import { Colors } from '../../../../../Theme/';

var {width} = Dimensions.get("window");
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




let token;
class OpinionAdd extends Component {

  constructor(props) {
    super(props);
    this.state = { text: "" ,
    
      visible: false,
      fetching:false
    }
    }
  
   





    formDefinition = {
      onSubmit: ({ title, body,tags }) => {
        this.props.signup({
          title,
          options0 ,
          options1,
          options2
          
        })
      },
      initialValues: {
        title: '',
        options0: '',
        options1: '',
        options2: '',

        
      },
      validationSchema: Yup.object().shape({
        title: Yup.string().required(I18n.t('validation.required')),
        options0: Yup.string().required(I18n.t('validation.required')),
        options1: Yup.string().required(I18n.t('validation.required')),
        options2: Yup.string()
      
      })
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
          <Text style={styles.title}>{I18n.t('opinionadd')}</Text>
        </View>
      )
    
      
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
              "options":{
                "0":values.options0,
                "1":values.options1, 
                '2':values.options2
              }
          })
         
      };
      
if(!this.state.fetching){
  this.setState({fetching:true})
      fetch(api, object)
      .then((response) =>{
        if(response.ok){
          this.setState({visible:true})
          this.props.navigation.navigate('Home');
          this.props.navigation.navigate('Polls');
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
      renderForm = () => {
                return (
          <Formik
            initialValues= {{
              title: '',
        options0: '',
        options1: '',
        options2: '',
           
         }}
     
          validationSchema={ Yup.object().shape({
           title: Yup.string().required(I18n.t('validation.required')),
           options0: Yup.string().required(I18n.t('validation.required')),
           options1: Yup.string().required(I18n.t('validation.required')),
           options2: Yup.string().required(I18n.t('validation.required')),
         
         })
          }
           onSubmit={this._handleSubmit}

            render={
              ({values ,handleSubmit ,submitCount ,setFieldValue ,errors ,
                          touched ,setFieldTouched ,isValid ,isSubmitting }) => (
              
                            <React.Fragment> 

                
               <View style={styles.formcontainer}>
                    <View  >
                       <KeyboardAvoidingView>
                            <TextInput
                        value={values.title}
                           style={[styles.inputcontainer,{borderRadius:60}]}
                            onChangeText={text => setFieldValue("title", text)}
                            onBlur={() => setFieldTouched("title")}
                            error={
                               touched.title || submitCount > 0
                                 ? errors.title
                                 : null
                             }
                          placeholder={I18n.t('address')}
                    placeholderTextColor={Colors.gray}

                        /> 
                          <Message name='title' />

                          <TextInput
                        value={values.options0}
                             style={[styles.inputcontainer,{borderRadius:60}]}
                            onChangeText={text => setFieldValue("options0", text)}
                            onBlur={() => setFieldTouched("options0")}
                            error={
                               touched.title || submitCount > 0
                                 ? errors.title
                                 : null
                             }
                           placeholder={I18n.t('firstChoice')}
                    placeholderTextColor={Colors.gray}
                         /> 
                         <Message name='options0' />
                      <TextInput
                        value={values.options1}
                             style={[styles.inputcontainer,{borderRadius:60}]}
                             onChangeText={text => setFieldValue("options1", text)}
                            onBlur={() => setFieldTouched("options1")}
                            error={
                               touched.title || submitCount > 0
                                 ? errors.title
                                 : null
                             }
                          placeholder={I18n.t('secondChoice')}
                          placeholderTextColor={Colors.gray}
                        /> 
                        <Message name='options1' />

                        <View>
                        <Toast style={{backgroundColor:"green" ,padding:20}} 
                                    visible={this.state.visible} 
                                    message="تم اضافه تصويت" />

                       <TextInput
                        value={values.options2}
                             style={[styles.inputcontainer,{borderRadius:60}]}
                            onChangeText={text => setFieldValue("options2", text)}
                            onBlur={() => setFieldTouched("options2")}
                            error={
                               touched.title || submitCount > 0
                                 ? errors.title
                                 : null
                             }
                       
                          placeholder={I18n.t('thirdChoice')}
                          placeholderTextColor={Colors.gray}
 
                        />
                        <Message name='options2' />
                    
                        </View>   
                           </KeyboardAvoidingView>
                           <View style={styles.addButton}> 
                          
                               </View>
                             <View style={styles.saveButton}> 
                                <Button
                                    style={styles.iconLeft}
                                    type='secondary'
                                    buttonColor={Colors.dustyOrange}
                                    onPress={handleSubmit}
                                    title={I18n.t('addButton')}
                                    disabled={isSubmitting}
                                 loading={isSubmitting}
                 />                           
                           </View>  
                            

                            
                  </View>
                  </View>  
</React.Fragment>
)
            }         
            
          />
        )
      }



  render () {
  //  //console.log(this.props.login)
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
const mapStateToProps = (state, ownProps) => {
token=state.login.token
  return {
    fetching: state.signup.fetching,
    errors: state.signup.errors
  }
}

const mapDispatchToProps = dispatch => ({
  signup: (
    title,
    options0,
    options1,
    options2

    
    
  ) =>
    dispatch(
      SignupActions.FormRequest(title,options0,options1,options2)
    )
})

OpinionAdd.propTypes = {
  signup: func,
  fetching: bool,
  errors: bool
}

OpinionAdd.defaultProps = {
  signup: () => {},

  fetching: false,
  errors: false
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OpinionAdd)


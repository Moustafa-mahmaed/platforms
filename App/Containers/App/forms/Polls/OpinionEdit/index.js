import React, { Component } from 'react'
import { object } from 'prop-types'
import { View,StyleSheet, Text , Platform, Dimensions , Button as Btn,Icon, ListView,TextInput, KeyboardAvoidingView , Keyboard,ScrollView } from 'react-native'
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




let token;
class OpinionAdd extends Component {

  constructor(props) {
    super(props);
    this.state = { text: "" };
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
    
      

      renderForm = () => {
        
        const { fetching, errors } = this.props
        return (
          
          <Formik
            {...this.formDefinition}
            render={props => {
              return (

                
               <View style={styles.formcontainer}>
                    <View  >
                       <KeyboardAvoidingView >

                            <TextInput
                           style={[styles.inputcontainer,{borderRadius:60}]}
                                
                            onChangeText={props.handleChange('title')}
                            value={props.values.title}
                          placeholder={I18n.t('address')}
                          editable={!fetching}
                        /> 

                          <Message name='title' />
                     <TextInput
                             style={[styles.inputcontainer,{borderRadius:60}]}
                           
                       onChangeText={props.handleChange('options0')}
                       value={props.values.options0}
                          placeholder={I18n.t('firstChoice')}
                          editable={!fetching}
                        /> 
                           <Message name='option0' />
                      <TextInput
                             style={[styles.inputcontainer,{borderRadius:60}]}
                           
                          onChangeText={props.handleChange('options1')}
                          value={props.values.options1}
                          placeholder={I18n.t('secondChoice')}
                          editable={!fetching}
                        /> 
                        <Message name='option1' />

                        <View>

                    <TextInput
                       
                       onChangeText={props.handleChange('options2')}
                       value={props.values.options2}
                       
                             style={[styles.inputcontainer,{borderRadius:60}]}
                          placeholder={I18n.t('thirdChoice')}
                          editable={!fetching}
 
                        />
                        <Message name='option2' />

                     

                     
{/* 
                            <Ionicons
                               name="ios-close"
                                size={30} 
                             // onPress={handleDelete}
                             style={styles.iconwithinput}
                               color={Colors.brownGrey}
                               onPress={()=>{this.setState({text:""})}}
                                        />  */}
                      
                          
                        </View>


                      
       
        
  
                        
                              </KeyboardAvoidingView>



                             <View style={styles.addButton}> 
                             
                              


                               </View>
                             <View style={styles.saveButton}> 
                                <Button
                                    type='secondary'
                                    buttonColor={Colors.dustyOrange}
                                    style={styles.iconLeft}
                                    title={I18n.t('EditButton')}
                                       
                onPress={()=>{
                  
                  var object = {
                    method: 'POST',
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',
                      //  "Authorization": "Bearer jmLMfCBmebuYN5NEa335v2XQMMObYkbHYLejRbLZQJXn9lOjWrXaJISUxOn3"
                       "Authorization": `Bearer ${token}`
                    },
                    body:JSON.stringify( {
                        'title':props.values.title ,
                      
                      "options":{"0":props.values.options0,"1":props.values.options1, '2':props.values.options2}
                      
                    

                      
                    })
                   
                };
                //console.log(object)
                fetch(api, object)
                .then((response) =>{
                  //console.log("**************************************************");
                  if(response.ok){
                   
                    this.props.navigation.navigate('Home');
                    this.props.navigation.navigate('Polls');
                  }
                  //console.log(response);
            
            
                  response.text()
                  //console.log("**************************************************");
            
                }
                )
                .then((responseData) => {})
                .catch(function(err) {});
                  
                            }
                            }
                                    />                           
                           </View>  
                            

                            
                  </View>
                  </View>  

              )          
            }}
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
// //console.log(state.login.token)
token=state.login.token
 //console.log(token)


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


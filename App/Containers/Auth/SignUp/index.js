import React, { Component } from 'react'
import { func, bool } from 'prop-types'
import { connect } from 'react-redux'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { Text, View,ToastAndroid, Image, ScrollView } from 'react-native'
import Button from '../../../Components/Controls/Button'
import TextInput from '../../../Components/Controls/TextInput'
import Row from '../../../Components/Layout/Row'
import TwitterButton from '../Login/buttonTwitter';

import LoginActions from '../../../Redux/Actions/Auth/Login'
 
import { LoginManager } from 'react-native-fbsdk'
const FBSDK = require('react-native-fbsdk');
const {

  AccessToken,
  
} = FBSDK;
import {LoginButton, ShareDialog} from 'react-native-fbsdk';
import {  GraphRequestManager, GraphRequest } from 'react-native-fbsdk';

import SignupActions from '../../../Redux/Actions/Auth/Signup'
import I18n from '../../../I18n/I18n'
import Message from '../../../Components/Message'

import styles from './styles'
import { Colors } from '../../../Theme/'

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

class SignupScreen extends Component {
  static navigationOptions = {
    header: null
  }

  state = {
    token: ''
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    if (nextProps.token !== prevState.token) {
      return { token: nextProps.token }
    } else return null
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevProps.token !== this.props.token) {
      this.navigate('Home')()
    }
  }

  formDefinition = {
    onSubmit: values => {
      this.props.signup({
        name: values.username,
        first_name: values.firstName,
        last_name: values.lastName,
        email: values.email,
        password: values.password,
        password_confirmation: values.confirmPassword
      })
    },
    initialValues: {
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: Yup.object().shape({
      username: Yup.string().required(I18n.t('validation.required')),
      firstName: Yup.string().required(I18n.t('validation.required')),
      lastName: Yup.string().required(I18n.t('validation.required')),
      email: Yup.string()
        .email(I18n.t('validation.email'))
        .required(I18n.t('validation.required')),
      password: Yup.string()
        .min(8, I18n.t('validation.minLength'))
        .required(I18n.t('validation.required')),
      confirmPassword: Yup.string()
        .min(8, I18n.t('validation.minLength'))
        .required(I18n.t('validation.required'))
    })
  }

  navigate = route => () => {
    this.props.navigation.navigate(route)
  }

  renderForm = () => {
    // //console.log(this.props)
    const { fetching, errors } = this.props
    return (
      <Formik
        {...this.formDefinition}
        render={props => {
          return (
            <View style={styles.container}>
              <TextInput
                onChangeText={props.handleChange('username')}
                value={props.values.username}
                placeholder={I18n.t('username')}
                editable={!fetching}
                style={styles.firstInput}
              />

              <Message name='username' />
              {
                this.props.message !== null &&  this.props.message.name !==null ?
                <Text style={{paddingVertical:5,paddingHorizontal:3}}>{this.props.message.name}</Text>:
                null
              }

              <TextInput
                onChangeText={props.handleChange('firstName')}
                value={props.values.firstName}
                placeholder={I18n.t('firstName')}
                editable={!fetching}
              />

              <Message name='firstName' />

              <TextInput
                onChangeText={props.handleChange('lastName')}
                value={props.values.lastName}
                placeholder={I18n.t('lastName')}
                editable={!fetching}
                style={styles.firstInput}
              />

              <Message name='lastName' />

              <TextInput
                onChangeText={props.handleChange('email')}
                value={props.values.email}
                placeholder={I18n.t('email')}
                editable={!fetching}
                style={styles.firstInput}
              />

              <Message name='email' />
              {
                this.props.message !== null &&  this.props.message.email !==null ?
                <Text style={{paddingVertical:5,paddingHorizontal:3}}>{this.props.message.email}</Text>:
                null
              }

              <TextInput
                onChangeText={props.handleChange('password')}
                value={props.values.password}
                placeholder={I18n.t('password')}
                editable={!fetching}
                secureTextEntry
              />

              <Message name='password' />

              <TextInput
                onChangeText={props.handleChange('confirmPassword')}
                value={props.values.confirmPassword}
                placeholder={I18n.t('confirmPassword')}
                editable={!fetching}
                secureTextEntry
              />

              <Message name='confirmPassword' />
              {
                this.props.message !== null &&  this.props.message.password !==null ?
                <Text style={{paddingVertical:5,paddingHorizontal:3}}>{this.props.message.password}</Text>:
                null
              }
              <Button
                type='primary'
                onPress={props.handleSubmit}
                loading={fetching}
                disabled={fetching}
                title={I18n.t('signupSubmit')}
                style={styles.signupSubmit}
              />

              <Button
                type='transparent'
                onPress={this.navigate('LoginScreen')}
                title={I18n.t('login')}
              />

              <Row style={styles.margin}>
              {/* <Button
                  type='secondary'
                  buttonColor={Colors.twitter}
                  icon={require('../../../Images/Icons/twitter.png')}
                  style={styles.iconLeft}

                /> */}
                  <TwitterButton   />
                  <View style={{flex:1,height: 45,borderRadius: 20,borderWidth:10,borderColor:'#3c5a99'}}>
                  {/* <LoginButton 
                        permissions={['public_profile', 'email', 'user_birthday','user_photos' ]}

                        onLoginFinished={
                          (error, result) => {
                            if (error) {
                              alert("login has error: " +JSON.stringify(error) );
                              //console.log("login has error: " +JSON.stringify(error) );
                            } else if (result.isCancelled) {
                              alert("login is cancelled.");
                              //console.log("login is cancelled.");
                            } else {
                              AccessToken.getCurrentAccessToken().then(
                                (data) => {
                                  //console.log("________________________-")
                                  //console.log(data)
                                  //console.log("________________________-")
                                  
                                  let accessToken = data.accessToken;
                                  // alert(accessToken.toString());
                                  //console.log(accessToken.toString());
                                  // //console.log(JSON.stringify(data))
                      //wait for api 
                                  const responseInfoCallback = (error, result) => {
                                    if (error) {
                                      //console.log(error)
                                      alert('Error fetching data: ' + error.toString());
                                    } else {
                           console.log("result :")
                           console.log(result)
                           var object={
                            "provider":"facebook",
                            "user" : {
                            "id" : result.id,
                            "name" : result.name,
                            "email" :result.email ,
                            "avatar" :"https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwiug7ra-svmAhVkA2MBHRIbDcUQjRx6BAgBEAQ&url=https%3A%2F%2Fwuzzuf.net%2Fjobs%2Fcareers%2Ftrendleez-Egypt-36575&psig=AOvVaw2Haw4p0U4zkNLhwljT9Q9_&ust=1577196966957276"
                           
                            }}
                   //console.log("facebook api")
                   //console.log(object)
                  this.props.login(object )
                                      // id last_name first_name
                                  // alert(JSON.stringify(result))
                                  this.setState({social:'facebook',social_id:result.id ,userInfo:result});
                            // this.loginsocial()
                                  // alert('Success fetching data: ' + result.toString());
                                    }
                                  }
                      
                                  const infoRequest = new GraphRequest(
                                    '/me',
                                    {
                                      accessToken: accessToken,
                                      parameters: {
                                        fields: {
                                          string: 'email,name,first_name,middle_name,last_name,picture.type(large)'
                                        }
                                      }
                                    },
                                    responseInfoCallback
                                  );
                      
                                  // Start the graph request.
                                  new GraphRequestManager().addRequest(infoRequest).start();
                      
                                })
                            }
                          }
                        }
                          // onLoginFinished={
                          //   (error, result) => {
                          //     if (error) {
                          //       //console.log("login has error: " + result.error);
                          //     } else if (result.isCancelled) {
                          //       //console.log("login is cancelled.");
                          //     } else {
                          //       AccessToken.getCurrentAccessToken().then(
                          //         (data) => {
                          //           //console.log(data.accessToken.toString())
                          //         }
                          //       )
                          //     }
                          //   }
                          // }
                          onLogoutFinished={() => console.log("logout.")}/> */}
 <LoginButton 
                        permissions={['public_profile', 'email', 'user_birthday','user_photos' ]}
                        loginBehaviorAndroid={'web_only'}

                        onLoginFinished={
                          (error, result) => {
                            if (error) {
                              // alert("login has error: " +JSON.stringify(error) );
                              //console.log("login has error: " +JSON.stringify(error) );
                            } else if (result.isCancelled) {
                              // alert("login is cancelled.");
                              //console.log("login is cancelled.");
                            } else {
                              AccessToken.getCurrentAccessToken().then(
                                (data) => {
                                  console.log("________________________-")
                                  console.log(data)
                                  console.log("________________________-")
                                  
                                  let accessToken = data.accessToken;
                                  // alert(accessToken.toString());
                                  //console.log(accessToken.toString());
                                  // //console.log(JSON.stringify(data))
                      //wait for api 
                                  const responseInfoCallback = (error, result) => {
                                    if (error) {
                                      //console.log(error)
                                      // alert('Error fetching data: ' + error.toString());
                                    } else {
                           console.log("result :")
                           console.log(result)
                           var object={
                            "provider":"facebook",
                            "user" : {
                            "id" : result.id,
                            "name" : result.name,
                            "email" :result.email ,
                            "avatar" :"https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwiug7ra-svmAhVkA2MBHRIbDcUQjRx6BAgBEAQ&url=https%3A%2F%2Fwuzzuf.net%2Fjobs%2Fcareers%2Ftrendleez-Egypt-36575&psig=AOvVaw2Haw4p0U4zkNLhwljT9Q9_&ust=1577196966957276"
                           
                            }}
                   console.log("facebook api")
                   console.log(object)
                  this.props.login(object )
                                      // id last_name first_name
                                  // alert(JSON.stringify(result))
                                  this.setState({social:'facebook',social_id:result.id ,userInfo:result});
                            // this.loginsocial()
                                  // alert('Success fetching data: ' + result.toString());
                                    }
                                  }
                      
                                  const infoRequest = new GraphRequest(
                                    '/me',
                                    {
                                      accessToken: accessToken,
                                      parameters: {
                                        fields: {
                                          string: 'email,name,first_name,middle_name,last_name,picture.type(large)'
                                        }
                                      }
                                    },
                                    responseInfoCallback
                                  );
                      
                                  // Start the graph request.
                                  new GraphRequestManager().addRequest(infoRequest).start();
                      
                                })
                            }
                          }
                        }
                          // onLoginFinished={
                          //   (error, result) => {
                          //     if (error) {
                          //       //console.log("login has error: " + result.error);
                       //     } else if (result.isCancelled) {
                          //       //console.log("login is cancelled.");
                          //     } else {
                          //       AccessToken.getCurrentAccessToken().then(
                          //         (data) => {
                          //           //console.log(data.accessToken.toString())
                          //         }
                          //       )
                          //     }
                          //   }
                          // }
                          onLogoutFinished={() => console.log("logout.")}/>
                  </View>
                {/* <Button
                  type='secondary'
                  buttonColor={Colors.twitter}
                  icon={require('../../../Images/Icons/twitter.png')}
                  style={styles.iconLeft}
                />
                <LoginButton 
                        permissions={['public_profile', 'email', 'user_birthday','user_photos' ]}
                        loginBehaviorAndroid={'web_only'}

                        onLoginFinished={
                          (error, result) => {
                            if (error) {
                              alert("login has error: " +JSON.stringify(error) );
                              //console.log("login has error: " +JSON.stringify(error) );
                            } else if (result.isCancelled) {
                              alert("login is cancelled.");
                              //console.log("login is cancelled.");
                            } else {
                              AccessToken.getCurrentAccessToken().then(
                                (data) => {
                                  //console.log("________________________-")
                                  //console.log(data)
                                  //console.log("________________________-")
                                  
                                  let accessToken = data.accessToken;
                                  // alert(accessToken.toString());
                                  //console.log(accessToken.toString());
                                  // //console.log(JSON.stringify(data))
                      //wait for api 
                                  const responseInfoCallback = (error, result) => {
                                    if (error) {
                                      //console.log(error)
                                      alert('Error fetching data: ' + error.toString());
                                    } else {
                           console.log("result :")
                           console.log(result)
                           var object={
                            "provider":"facebook",
                            "user" : {
                            "id" : result.id,
                            "name" : result.name,
                            "email" :result.email ,
                            "avatar" :"https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwiug7ra-svmAhVkA2MBHRIbDcUQjRx6BAgBEAQ&url=https%3A%2F%2Fwuzzuf.net%2Fjobs%2Fcareers%2Ftrendleez-Egypt-36575&psig=AOvVaw2Haw4p0U4zkNLhwljT9Q9_&ust=1577196966957276"
                           
                            }}
                   //console.log("facebook api")
                   //console.log(object)
                  this.props.login(object )
                                      // id last_name first_name
                                  // alert(JSON.stringify(result))
                                  this.setState({social:'facebook',social_id:result.id ,userInfo:result});
                            // this.loginsocial()
                                  // alert('Success fetching data: ' + result.toString());
                                    }
                                  }
                      
                                  const infoRequest = new GraphRequest(
                                    '/me',
                                    {
                                      accessToken: accessToken,
                                      parameters: {
                                        fields: {
                                          string: 'email,name,first_name,middle_name,last_name,picture.type(large)'
                                        }
                                      }
                                    },
                                    responseInfoCallback
                                  );
                      
                                  // Start the graph request.
                                  new GraphRequestManager().addRequest(infoRequest).start();
                      
                                })
                            }
                          }
                        }
                          // onLoginFinished={
                          //   (error, result) => {
                          //     if (error) {
                          //       //console.log("login has error: " + result.error);
                       //     } else if (result.isCancelled) {
                          //       //console.log("login is cancelled.");
                          //     } else {
                          //       AccessToken.getCurrentAccessToken().then(
                          //         (data) => {
                          //           //console.log(data.accessToken.toString())
                          //         }
                          //       )
                          //     }
                          //   }
                          // }
                          onLogoutFinished={() => console.log("logout.")}/>

                {/* <Button
                  type='secondary'
                  buttonColor={Colors.facebook}
                  icon={require('../../../Images/Icons/facebook.png')}
                  style={styles.iconRight}
                  onPress={this.handleFacebookLogin}
                /> */} 
              </Row>
            </View>
          )
        }}
      />
    )
  }



  handleFacebookLogin =()=>{  
    // LoginManager.logInWithReadPermissions(['public_profile', 'email', 'user_birthday', ]).then(
      LoginManager.logInWithPermissions( ['public_profile','email',]).then(
      function (result) {
        if (result.isCancelled) {
          
          //console.log("login is cancelled.");
        } else {
          AccessToken.getCurrentAccessToken().then(
            (data) => {
              //console.log("________________________-")
              //console.log(data)
              
              //console.log("________________________-")
              var object={

          "provider":"facebook",
          "user" : {
          "id" : loginData.userID,
          "name" : loginData.name,
          "email" :loginData.email ,
          "avatar" :"https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwiug7ra-svmAhVkA2MBHRIbDcUQjRx6BAgBEAQ&url=https%3A%2F%2Fwuzzuf.net%2Fjobs%2Fcareers%2Ftrendleez-Egypt-36575&psig=AOvVaw2Haw4p0U4zkNLhwljT9Q9_&ust=1577196966957276"
          } 

}
//console.log("twitter api")
//console.log(object)
this.props.login(object )
              let accessToken = data.accessToken;
             
              //console.log(accessToken.toString());
              // //console.log(JSON.stringify(data))
  //wait for api 
              const responseInfoCallback = (error, result) => {
                if (error) {
                  //console.log(error)
                 
                } else {
                  //console.log(result)
                  // id last_name first_name
             
              this.setState({social:'facebook',social_id:result.id ,userInfo:result});
        // this.loginsocial()
            
                }
              }
  
              const infoRequest = new GraphRequest(
                '/me',
                {
                  accessToken: accessToken,
                  parameters: {
                    fields: {
                      string: 'email,name,first_name,middle_name,last_name'
                    }
                  }
                },
                responseInfoCallback
              );
  
              // Start the graph request.
              new GraphRequestManager().addRequest(infoRequest).start();
              
            }
            )
            
          }
        },


      function (error) {
    
        //console.log("login has error: " +JSON.stringify(error) );
      }
      )
     }
  render () {
    const { root, logo, title } = styles
    // //console.log(this.props)
    return (
      <View style={root}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Image style={logo} source={require('../../../Images/Logo.png')} />

          <Text style={title}>{I18n.t('signup?')}</Text>
          
       
    

          {this.renderForm()}
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  //console.log(state)
  return {
    token: state.signup.token,
    fetching: state.signup.fetching,
    errors: state.signup.errors,
    message:state.signup.message
  }
}

const mapDispatchToProps = dispatch => ({
    login: (object) =>
    dispatch(LoginActions.loginRequest(object)),
  signup: ({
    name,
    first_name,
    last_name,
    email,
    password,
    password_confirmation
  }) =>
    dispatch(
      SignupActions.signupRequest({
        name,
        first_name,
        last_name,
        email,
        password,
        password_confirmation
      })
    )
})

SignupScreen.propTypes = {
  signup: func,
  fetching: bool,
  errors: bool
}

SignupScreen.defaultProps = {
  signup: () => {},
  token: '',
  fetching: false,
  errors: false
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupScreen)

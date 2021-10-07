import React, { Component } from 'react'
import { func, bool } from 'prop-types'
import { connect } from 'react-redux'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { Text, View, Image, ScrollView,TouchableWithoutFeedback } from 'react-native'
import Button from '../../../Components/Controls/Button'
import TextInput from '../../../Components/Controls/TextInput'
import Row from '../../../Components/Layout/Row'
 
import { LoginManager } from 'react-native-fbsdk'
import TwitterButton from './buttonTwitter';
 import LoginActions from '../../../Redux/Actions/Auth/Login'

import I18n from '../../../I18n/I18n'
import Message from '../../../Components/Message'

import styles from './styles'
import { Colors } from '../../../Theme/'

// import { LoginButton, AccessToken } from 'react-native-fbsdk';
const FBSDK = require('react-native-fbsdk');
const {
  // LoginButton,
  AccessToken,
  // LoginManager
} = FBSDK;
import {LoginButton, ShareDialog} from 'react-native-fbsdk';
import {  GraphRequestManager, GraphRequest } from 'react-native-fbsdk';




class LoginScreen extends Component {
  static navigationOptions = {
    header: null
  }

  state = {
    token: '',
   
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
    onSubmit: ({ email, password }) => {
      var object={
email, password
      }
       this.props.login(object)
    },
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email(I18n.t('validation.email'))
        .required(I18n.t('validation.required')),
      password: Yup.string()
        .min(8, I18n.t('validation.minLength'))
        .required(I18n.t('validation.required'))
    })
  }


  navigate = route => () => {
    this.props.navigation.navigate(route)
  }
  
  renderForm = () => {
    const { fetching, errors } = this.props
    return (
      <Formik
        {...this.formDefinition}
        render={props => {
          return (
            
            <View style={styles.container}>
              <TextInput
                onChangeText={props.handleChange('email')}
                value={props.values.email}
                placeholder={I18n.t('email')}
                editable={!fetching}
                style={styles.firstInput}
                icon={require('../../../Images/Icons/email.png')}
              />

              <Message name='email' />

              <TextInput
                inputStyle={styles.password}
                onChangeText={props.handleChange('password')}
                value={props.values.password}
                placeholder={I18n.t('password')}
                editable={!fetching}
                icon={require('../../../Images/Icons/password.png')}
                secureTextEntry
              />

              <Message name='password' />
             
             
             
         

              <Button
                type='primary'
                onPress={props.handleSubmit}
                loading={fetching}
                disabled={fetching}
                title={I18n.t('loginSubmit')}
                style={styles.loginSubmit}
                />
                

              <Row>
                <Button
                  type='transparent'
                  onPress={this.navigate('SignUpScreen')}
                  title={I18n.t('signup?')}
                />
                <Button
                  type='transparent'
                  onPress={this.navigate('ForgetPasswordScreen')}
                  title={I18n.t('forgetPassword?')}
                />
              </Row>

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
                          //  console.log("result :")
                          //  console.log(result)
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
                  buttonColor={Colors.facebook}
                  icon={require('../../../Images/Icons/facebook.png')}
                  style={styles.iconRight}
                   onPress={this.handleFacebookLogin}
                  

                /> 
                
                */}
                        
              </Row>
            </View>
          )
        }}
      />
    )
  }



//   handleFacebookLogin =()=>{  
//     // LoginManager.logInWithReadPermissions(['public_profile', 'email', 'user_birthday', ]).then(
//       LoginManager.logInWithPermissions( ['public_profile','email',]).then(
//       function (result) {
//         if (result.isCancelled) {
         
//           //console.log("login is cancelled.");
//         } else {
//           AccessToken.getCurrentAccessToken().then(
//             (loginData) => {
//               //console.log("________________________-")
//               //console.log(loginData)
              
//               //console.log("________________________-")
//               var object={

//           "provider":"facebook",
//           "user" : {
//           "id" : loginData.id,
//           "name" : loginData.name,
//           "email" :loginData.email ,
//           "avatar" :"https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwiug7ra-svmAhVkA2MBHRIbDcUQjRx6BAgBEAQ&url=https%3A%2F%2Fwuzzuf.net%2Fjobs%2Fcareers%2Ftrendleez-Egypt-36575&psig=AOvVaw2Haw4p0U4zkNLhwljT9Q9_&ust=1577196966957276"
         
//           } 
// // {  "picture": {"data": {"height": 200, "is_silhouette": false, "url": "https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=2751727571573854&height=200&width=200&ext=1579941760&hash=AeQvqUwAYT5XL9yJ", "width": 200}}}
// }
//  //console.log("facebook api")
//  //console.log(object)
// this.props.login(object )
//               let accessToken = data.accessToken;
           
//               //console.log(accessToken.toString());
//               // //console.log(JSON.stringify(data))
//   //wait for api 
//               const responseInfoCallback = (error, result) => {
//                 if (error) {
//                   //console.log(error)
                 
//                 } else {
//                   //console.log(result)
//                   // id last_name first_name
              
//               this.setState({social:'facebook',social_id:result.id ,userInfo:result});
//         // this.loginsocial()
            
//                 }
//               }
  
//               const infoRequest = new GraphRequest(
//                 '/me',
//                 {
//                   accessToken: accessToken,
//                   parameters: {
//                     fields: {
//                       string: 'email,name,first_name,middle_name,last_name'
//                     }
//                   }
//                 },
//                 responseInfoCallback
//               );
  
//               // Start the graph request.
//               new GraphRequestManager().addRequest(infoRequest).start();
              
//             }
//             )
            
//           }
//         },


//       function (error) {
        
        
//         //console.log("login has error: " +JSON.stringify(error) );
//       }
//       )
//      }
   
  render () {
    const { root, logo, illustration, title } = styles


    return (
      <View style={root}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Image style={logo} source={require('../../../Images/Logo.png')} />

          <View>
            <Image style={illustration} source={require('../../../Images/Man.png')} />
            <Text style={title}>{I18n.t('login')}</Text>
          </View>
       
          {this.renderForm()}
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
 
  return {
    token: state.login.token,

    fetching: state.login.fetching,
    errors: state.login.errors,
    message: state.login.message

  }
}

const mapDispatchToProps = dispatch => ({
  login: (object) =>
    dispatch(LoginActions.loginRequest(object))
})

LoginScreen.propTypes = {
  login: func,
  fetching: bool,
  errors: bool
}

LoginScreen.defaultProps = {
  login: () => {},
  token: '',
  fetching: false,
  errors: false
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen)

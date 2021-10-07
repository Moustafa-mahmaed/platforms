import React, { Component,Fragment } from 'react'
import { object } from 'prop-types'
import * as Yup from 'yup'
import { connect } from 'react-redux'

import LinearGradient from 'react-native-linear-gradient'
import I18n from '../../../I18n/I18n'
import { Formik } from 'formik'
import TextInput from '../../../Components/Controls/TextInput'
import Message from '../../../Components/Message'

let token;

import PostActions from '../../../Redux/Actions/Post'

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
import { Text,StatusBar,Image, View, ScrollView ,ToastAndroid,Platform} from 'react-native'

// var {width}=Dimensions.get("window")
const IS_IOS = Platform.OS === 'ios'
let iconType = IS_IOS ? 'ios' : 'md'

import { Colors } from '../../../Theme'




import styles from './styles'
import Button from '../../../Components/Controls/Button'


class NameScreen extends Component {
  constructor(props){
    super(props)
    this.state={
      visible:false
    }
  }
  formDefinition = {
    // onSubmit: ({ email, password }) => {
    //   this.props.login(email, password)
    // },
    initialValues: {
      email: '',
     
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email(I18n.t('validation.email'))
        .required(I18n.t('validation.required'))
     
    })
  }

  renderGradient = () => (
    <Fragment>
        <LinearGradient
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
        colors={['#F5F5F5', '#F5F5F5']}
        style={styles.gradientHeader}
      />
      {this.renderBackButton()}
    </Fragment>
  )
  renderBackButton = () => {
    return (
      <Button
        onPress={() => {
          this.props.navigation.goBack()
        }}
        iconSettings={{
          iconName: `${iconType}-arrow-back`,
          iconSize: 25,
          iconTintColor: Colors.basic.black,
          iconStyle: styles.backButtonIcon
        }}
        type='transparent'
        buttonColor={Colors.rouge}
        containerStyle={styles.backButton}
      />
    )
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
            

              <Button
                type='primary'
                // onPress={props.handleSubmit}
                onPress={()=>{
            var object = {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                // "Authorization": `Bearer ${token}`
                
              },
              body:JSON.stringify( {
                // check edit 
                 'email':props.values.email     
              
        })
      };
      console.log(object)

      // check edit  
       const api=`https://forums.influancy.com/api/forgot`
        fetch(api, object)
        .then((response) =>{
    
          if(response.ok){
        this.setState({ visible:true  })
         
      this.props.navigation.navigate("Loading")

            
          }
          
          response.text()
          
        }
        )
        .then((responseData) => {})
        .catch(function(err) {});
  
        
                }}
                loading={fetching}
                disabled={fetching}
                title={I18n.t('recoverPassword')}
                style={styles.loginSubmit}
              />

           

             
            </View>
          )
        }}
      />
    )
  }

  navigate = route => () => {
    this.props.navigation.navigate(route)
  }
  forgetpassword =()=>{
    
          
        }
  
  
  render () {
    const { root, logo, illustration, title } = styles

    return (
    
         <ScrollView  style={styles.root} showsVerticalScrollIndicator={false}>
  <Toast visible={this.state.visible} message="تم ارسال رسالة الي بريدك الالكتروني لاستعادة كلمة المرور" />
        
        <StatusBar barStyle='dark-content' />

        {this.renderGradient()}
          <Image style={logo} source={require('../../../Images/Logo.png')} />
          <View>
            <Image style={illustration} source={require('../../../Images/Group147.png')} />
            <Text style={title}>{I18n.t('forgetPassword?')}</Text>
          </View>
          {this.renderForm()}

      </ScrollView>
    )
  }
}

NameScreen.propTypes = {
  navigation: object
}

NameScreen.defaultProps = {
  navigation: {}
}

// const mapStateToProps = (state, ownProps) => {
//   token =state.login.token  
  
//   return {
    
//     data: state.post.data,
//     fetching: state.post.fetching,
//     errors: state.post.errors
//   }
// }

// const mapDispatchToProps = dispatch => ({
//   getPost: (category, id) => dispatch(PostActions.postRequest(category, id))
// })
// export default 
// connect(
//   mapStateToProps,
//   mapDispatchToProps)
// (NameScreen)
export default NameScreen

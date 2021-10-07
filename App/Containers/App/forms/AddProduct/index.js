import React, { Component } from 'react'
import { object } from 'prop-types'
import { View,StyleSheet, Text , Platform, Dimensions , Button as Btn,Icon, ListView,TextInput, KeyboardAvoidingView , Keyboard,ScrollView } from 'react-native'
import TextInput1 from '../../../../Components/Controls/TextInput'
import Hash from "../../../../Components/Controls/hash"
import TextArea from "../../../../Components/Controls/TextArea"

import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Message from '../../../../Components/Message'

import { Formik } from 'formik'

import { connect } from 'react-redux'
import LoginActions from '../../../../Redux/Actions/Auth/Login'
import Button from '../../../../Components/Controls/Button'
import LinearGradient from 'react-native-linear-gradient'

 
import I18n from '../../../../I18n/I18n'
import { Colors } from '../../../../Theme'

import styles from './styles'

var {width} = Dimensions.get("window");
const IS_IOS = Platform.OS === 'ios'
let iconType = IS_IOS ? 'ios' : 'md'


class AddProduct extends Component {
    
  renderBackButton = () => {
    return (
      <Button
        onPress={() => {
          this.props.navigation.goBack()
        }}
        iconSettings={{
          iconName: `${iconType}-arrow-back`,
          iconSize: 25,
          iconTintColor: Colors.basic.white,
          iconStyle: styles.backButtonIcon
        }}
        type='transparent'
        buttonColor={Colors.purble}
        containerStyle={styles.backButton}
      />
    )
  }


  renderGradient = () => (
    <LinearGradient
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 1 }}
          colors={[Colors.purble, Colors.purble]}
      style={styles.gradientHeader}
    />
  )
    
      renderTitle = () => (
        <View style={styles.titleContainer}>
          {this.renderBackButton()}
          <Text style={styles.title}>{I18n.t('AddProduct')}</Text>
        </View>
      )
      /* =====================================================================*/
      renderForm = () => {
        const { fetching, errors } = this.props
        return (
          <Formik
            {...this.formDefinition}
            render={props => {
              return (  
                <View style={styles.root}>
                  <View style={styles.formcontainer}>
                            <TextInput
                          // onFocus={Keyboard.dismiss()}
                          style={[styles.inputcontainer,{borderRadius:60}]}
                          placeholder={I18n.t('productName')}
                          editable={!fetching}
                        /> 
                                           {/* Add Button & Save Button */}

                             {/* <View style={styles.saveButton}> 
                                <Button
                                    type='secondary'
                                    buttonColor={Colors.purble}
                                    style={styles.iconLeft}
                                    title={I18n.t('save')}
                                    // onPress={this._handleSendButtonPress}
                                    />                           
                           </View>            */}
                   </View>  

                 </View>

              )          
            }}
          />
        )
      }

       

      /*=============================================================*/
  render () {
   
    return (
      <View style={styles.root}>
            <View style={styles.root}>
            {this.renderGradient()}
            {this.renderTitle()}
      
       <View>
         {this.renderForm()}
          
       </View>
       
     
        
      </View>
      </View>
    )
  }
}

AddProduct.propTypes = {
  navigation: object
}

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(LoginActions.logout())
})

export default connect(
  null,
  mapDispatchToProps
)(AddProduct)

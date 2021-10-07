import React from 'react'
import { View, TextInput  , Image, Text  } from 'react-native'
import { object, string, any } from 'prop-types'

import styles from './styles'
import { Colors } from '../../../Theme'



class TextArea extends React.Component {
    
    render () {

      const { style, inputStyle, error, icon } = this.props
      const errorStyle = error ? styles.error : {}
      const errorTextStyle = error ? styles.textError : {}
      return (
        <View style={[styles.container, style, errorStyle]}>
         <TextInput 
          {...this.props}
          multiline={true}
          numberOfLines={4}
          style={[styles.input, inputStyle, errorTextStyle,styles.textArea]}
          placeholderTextColor={Colors.ice}
          underlineColorAndroid='transparent'
        />
  
  
        
        </View>
      )
    }
  }
  
  TextArea.propTypes = {
    style: object,
    inputStyle: object,
    value: string,
    icon: any
  }
  
  TextArea.defaultProps = {
    style: {},
    inputStyle: {},
    value: '',
    icon: null
  }
  
  export default TextArea

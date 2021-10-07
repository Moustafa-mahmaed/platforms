import React from 'react'
import { View, TextInput as RNTextInput, Image } from 'react-native'
import { object, string, any } from 'prop-types'

import styles from './styles'
import { Colors } from '~/Theme'

class TextInput extends React.Component {
  render () {
    const { style, inputStyle, error, icon } = this.props
    const errorStyle = error ? styles.error : {}
    const errorTextStyle = error ? styles.textError : {}
    return (
      <View style={[styles.container, style, errorStyle]}>
        <RNTextInput
          {...this.props}
          style={[styles.input, inputStyle, errorTextStyle]}
          placeholderTextColor={Colors.ice}
          underlineColorAndroid='transparent'
        />

        {icon && <Image style={styles.icon} source={icon} />}
      </View>
    )
  }
}

TextInput.propTypes = {
  style: object,
  inputStyle: object,
  value: string,
  icon: any
}

TextInput.defaultProps = {
  style: {},
  inputStyle: {},
  value: '',
  icon: null
}

export default TextInput

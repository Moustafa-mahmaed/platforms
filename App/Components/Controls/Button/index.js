import React, { Component } from 'react'
import { func, bool, any, string, object } from 'prop-types'

import LinearGradient from 'react-native-linear-gradient'
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Image
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

import { Colors } from '../../../Theme'
import styles from './styles'

class Button extends Component {
  getStyle (type) {
    const { buttonColor } = this.props

    if (type === 'transparent') {
      return [styles.transparent]
    } else if (type === 'primary') {
      return [styles.primary]
    } else if (type === 'secondary') {
      return [styles.secondary, { backgroundColor: buttonColor }]
    } else {
      return {}
    }
  }

  renderContent = () => {
    const { type, title } = this.props
    if (type === 'primary') {
      return (
        <LinearGradient
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 1 }}
          // TODO: make colors reusable
          colors={[Colors.tomato, Colors.dustyOrange]}
          style={styles.button}
        >
          <Text style={styles.primaryTitle}>{title}</Text>
        </LinearGradient>
      )
    } else if (type === 'secondary') {
      return <Text style={styles.secondaryTitle}>{title}</Text>
    } else if (type === 'transparent') {
      return <Text style={styles.linkTitle}>{title}</Text>
    }
  }

  render () {
    const {
      style,
      containerStyle,
      type,
      disabled,
      loading,
      onPress,
      icon,
      iconSettings
    } = this.props
    const disabledStyle = disabled ? { ...styles.disabled } : {}
    const { iconName, iconSize, iconTintColor, iconStyle } = iconSettings
    return (
      <View style={[styles.root, containerStyle]}>
        <TouchableOpacity
          {...this.props}
          style={[styles.button, style, ...this.getStyle(type), disabledStyle]}
          onPress={onPress}
        >
          {icon && <Image source={icon} />}
          {iconSettings && (
            <Icon
              style={[styles.icon, iconStyle]}
              name={iconName}
              size={iconSize}
              color={iconTintColor}
            />
          )}
          {this.renderContent()}
          {loading && (
            <ActivityIndicator
              size='small'
              color={Colors.basic.white}
              style={styles.fetching}
            />
          )}
        </TouchableOpacity>
      </View>
    )
  }
}

Button.propTypes = {
  title: string,
  style: object,
  containerStyle: object,
  type: string,
  disabled: bool,
  onPress: func,
  children: any,
  buttonColor: string,
  icon: any,
  iconSettings: object
}

Button.defaultProps = {
  title: '',
  style: {},
  containerStyle: {},
  type: 'primary',
  disabled: false,
  onPress: () => {},
  children: null,
  buttonColor: '',
  icon: null,
  iconSettings: {}
}

export default Button
